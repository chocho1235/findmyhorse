-- Drop existing table and policies if they exist
DROP POLICY IF EXISTS "Allow admin users to read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Allow service role to manage admin_users" ON admin_users;
DROP TABLE IF EXISTS admin_users;

-- Recreate the admin_users table with proper structure
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read the admin_users table
CREATE POLICY "Allow all authenticated users to read admin_users"
    ON admin_users
    FOR SELECT
    TO authenticated
    USING (true);

-- Create a policy that allows service role to manage admin_users
CREATE POLICY "Allow service role to manage admin_users"
    ON admin_users
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT ON admin_users TO authenticated;
GRANT ALL ON admin_users TO service_role;

-- Insert the admin user
INSERT INTO admin_users (email)
VALUES ('enquiries@equinology.co.uk')
ON CONFLICT (email) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 