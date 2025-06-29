-- Drop existing view and policy
DROP POLICY IF EXISTS "Only admin users can view user management" ON public.user_management;
DROP VIEW IF EXISTS public.user_management;

-- Create the view
CREATE OR REPLACE VIEW public.user_management AS
SELECT 
  au.id,
  au.email,
  au.created_at,
  au.last_sign_in_at,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role
FROM auth.users au;

-- Enable RLS
ALTER VIEW public.user_management ENABLE ROW LEVEL SECURITY;

-- Grant access to authenticated users
GRANT SELECT ON public.user_management TO authenticated;

-- Create RLS policy
CREATE POLICY "Only admin users can view user management"
ON public.user_management
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = auth.jwt()->>'email'
  )
); 