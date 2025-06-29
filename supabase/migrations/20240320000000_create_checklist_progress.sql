-- Create user_checklist_progress table
CREATE TABLE IF NOT EXISTS user_checklist_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    checklist_type TEXT NOT NULL,
    progress JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, checklist_type)
);

-- Enable RLS
ALTER TABLE user_checklist_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own checklist progress"
    ON user_checklist_progress
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own checklist progress"
    ON user_checklist_progress
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checklist progress"
    ON user_checklist_progress
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_checklist_progress_updated_at
    BEFORE UPDATE ON user_checklist_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 