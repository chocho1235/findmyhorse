import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from "@/hooks/use-toast";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const Requirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center text-sm ${met ? 'text-green-600' : 'text-zinc-500'}`}>
      {met ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
      {text}
    </div>
);

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    if (!allRequirementsMet) {
        setFormError("Please ensure your password meets all the specified criteria.");
        return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please check your passwords and try again.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await signup(email, password, username);
      if (error) {
        setFormError(error.message || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }
      setSuccessMessage("If an account with that email exists, a verification email has been sent. If you do not receive an email, the account may already be registered and confirmed.");
    } catch (error: any) {
      setFormError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Create an Account</CardTitle>
            <CardDescription>Join our community to access exclusive tools and resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="your_username" required value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              
              <div 
                className="space-y-2" 
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              >
                <Label htmlFor="password">Password</Label>
                 <Popover open={isPasswordFocused}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-72" 
                    side="right" 
                    align="start"
                  >
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-zinc-800">Password must include:</p>
                        <Requirement met={passwordRequirements.length} text="At least 8 characters" />
                        <Requirement met={passwordRequirements.uppercase} text="An uppercase letter" />
                        <Requirement met={passwordRequirements.lowercase} text="A lowercase letter" />
                        <Requirement met={passwordRequirements.number} text="A number" />
                        <Requirement met={passwordRequirements.specialChar} text="A special character" />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !allRequirementsMet || password !== confirmPassword}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
            {formError && (
              <div className="mt-4 text-sm text-red-600 text-center" role="alert">
                {formError}
              </div>
            )}
            {successMessage && (
              <div className="mt-4 text-sm text-green-600 text-center" role="status">
                {successMessage}
              </div>
            )}
            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-equine-accent hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp; 