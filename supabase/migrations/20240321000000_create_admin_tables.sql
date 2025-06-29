-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only service role can manage admin users"
    ON admin_users
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Insert the admin user
INSERT INTO admin_users (email)
VALUES ('enquiries@equinology.co.uk')
ON CONFLICT (email) DO NOTHING;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 