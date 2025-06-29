-- Grant necessary permissions to authenticated users
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON public.profiles TO authenticated;

-- Create a view for user management that combines auth.users and profiles
CREATE OR REPLACE VIEW user_management AS
SELECT 
    u.id,
    u.email,
    u.created_at,
    u.last_sign_in_at as last_sign_in,
    u.role,
    p.name as full_name,
    p.company as company_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id;

-- Grant access to the view
GRANT SELECT ON user_management TO authenticated;

-- Make the view secure by default
ALTER VIEW user_management OWNER TO postgres; 