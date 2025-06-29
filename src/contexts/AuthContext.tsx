import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, MAX_LOGIN_ATTEMPTS, LOGIN_ATTEMPT_WINDOW, LoginAttempt } from '../lib/supabaseClient';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface Profile {
  username: string;
  updated_at: string;
}

// Define the shape of the context value
interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, username: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (username: string) => Promise<any>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          const { data: profileData, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          if (error) {
            console.error("Error fetching profile on initial session:", error);
            // Don't throw, just fail gracefully
          } else {
            setProfile(profileData);
          }
        } catch (e) {
            console.error("Caught exception fetching profile on initial session:", e);
        }
      }
      setLoading(false);

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'PASSWORD_RECOVERY' && session === null) {
            navigate('/token-expired');
            setLoading(false);
            return;
          }
          
          setUser(session?.user ?? null);
          if (session?.user) {
            try {
              const { data: profileData, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
              if (error) {
                console.error("Error fetching profile on auth state change:", error);
                setProfile(null); // Reset profile on error
              } else {
                setProfile(profileData);
              }
            } catch (e) {
                console.error("Caught exception fetching profile on auth state change:", e);
                setProfile(null);
            }
          } else {
            setProfile(null);
          }
          setLoading(false);
        }
      );

      return () => {
        subscription?.unsubscribe();
      };
    };
    
    getInitialSession();
  }, [navigate]);

  const login = async (email: string, pass: string) => {
    // Get client IP from request headers
    const clientIP = window.location.hostname === 'localhost' ? '127.0.0.1' : 'unknown';

    // Check if the account is locked
    const { data: attemptData, error: attemptError } = await supabase
      .from('login_attempts')
      .select('*')
      .eq('ip_address', clientIP)
      .maybeSingle();

    if (attemptError) {
      console.error("Error checking login attempts:", attemptError);
      throw new Error("An error occurred while checking login attempts. Please try again.");
    }

    const attempt: LoginAttempt = attemptData || {
      ip_address: clientIP,
      attempts: 0,
      last_attempt: new Date().toISOString(),
      locked_until: null
    };

    // Check if account is locked
    if (attempt.locked_until && new Date(attempt.locked_until) > new Date()) {
      const remainingTime = Math.ceil((new Date(attempt.locked_until).getTime() - new Date().getTime()) / 60000);
      throw new Error(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
    }

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: email.toLowerCase().trim(), 
      password: pass 
    });

    if (error) {
      // Update login attempts
      const newAttempts = (attempt.attempts || 0) + 1;
      const now = new Date();
      const lockedUntil = newAttempts >= MAX_LOGIN_ATTEMPTS 
        ? new Date(now.getTime() + LOGIN_ATTEMPT_WINDOW).toISOString()
        : null;

      const { error: upsertError } = await supabase
        .from('login_attempts')
        .upsert({
          ip_address: clientIP,
          attempts: newAttempts,
          last_attempt: now.toISOString(),
          locked_until: lockedUntil
        }, {
          onConflict: 'ip_address'
        });

      if (upsertError) {
        console.error("Error updating login attempts:", upsertError);
      }

      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        throw new Error(`Too many failed attempts. Please try again in 15 minutes.`);
      }

      const remainingAttempts = MAX_LOGIN_ATTEMPTS - newAttempts;
      throw new Error(`Invalid login credentials. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`);
    }

    // Reset login attempts on successful login
    if (attempt.attempts > 0) {
      const { error: upsertError } = await supabase
        .from('login_attempts')
        .upsert({
          ip_address: clientIP,
          attempts: 0,
          last_attempt: new Date().toISOString(),
          locked_until: null
        }, {
          onConflict: 'ip_address'
        });

      if (upsertError) {
        console.error("Error resetting login attempts:", upsertError);
      }
    }

    return { data, error: null };
  };

  const signup = async (email: string, pass: string, username: string) => {
    return await supabase.auth.signUp({ 
      email: email, 
      password: pass,
      options: {
        data: {
          username: username,
        }
      }
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (username: string) => {
    if (!user) throw new Error("User not authenticated");

    // Check if the user has a profile and when it was last updated
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('updated_at')
      .eq('id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // Ignore 'range not found' error for new users
        throw fetchError;
    }

    if (existingProfile && existingProfile.updated_at) {
        const lastUpdate = new Date(existingProfile.updated_at);
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (new Date().getTime() - lastUpdate.getTime() < sevenDays) {
            throw new Error("You can only update your username once a week.");
        }
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, username, updated_at: new Date().toISOString() })
      .select()
      .single();
    
    if (error) throw error;
    setProfile(data);
    return data;
  }

  const value = {
    user,
    profile,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 