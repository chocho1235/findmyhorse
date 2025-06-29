-- Grant necessary permissions to authenticated role
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT SELECT ON auth.users TO authenticated; 