import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 

// Define the maximum number of login attempts allowed
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

// Define the login attempts table type
export interface LoginAttempt {
  id: string;
  ip_address: string;
  attempts: number;
  last_attempt: string;
  locked_until: string | null;
} 