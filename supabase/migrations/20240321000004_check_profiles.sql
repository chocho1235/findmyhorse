-- First, let's check if the profiles table exists and create it if it doesn't
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Grant necessary permissions
GRANT SELECT ON public.profiles TO authenticated;

-- Now create the user management view with the correct column names
CREATE OR REPLACE VIEW user_management AS
SELECT 
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at as last_sign_in,
    u.role,
    CONCAT(p.first_name, ' ', p.last_name) as full_name,
    p.company as company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id;

-- Grant access to the view
GRANT SELECT ON user_management TO authenticated;

-- Make the view secure by default
ALTER VIEW user_management OWNER TO postgres; 