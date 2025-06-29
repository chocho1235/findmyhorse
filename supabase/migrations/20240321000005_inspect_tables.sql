-- List all tables in the public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- List all columns in the profiles table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles';

-- List all columns in the auth.users table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'users'; 