-- First, let's make sure the admin user exists
INSERT INTO admin_users (email)
VALUES ('enquiries@equinology.co.uk')
ON CONFLICT (email) DO NOTHING;

-- Update the RLS policies to be more permissive for admin access
DROP POLICY IF EXISTS "Only service role can manage admin users" ON admin_users;

-- Create new policies that allow admin users to read the admin_users table
CREATE POLICY "Allow admin users to read admin_users"
    ON admin_users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE email = auth.jwt() ->> 'email'
        )
    );

-- Create policy for service role to manage admin users
CREATE POLICY "Allow service role to manage admin_users"
    ON admin_users
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Grant necessary permissions to authenticated users
GRANT SELECT ON admin_users TO authenticated;
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON public.profiles TO authenticated; 