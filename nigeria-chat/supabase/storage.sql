-- =============================================================================
-- Nigeria Chat Supabase Storage Buckets & Policies
-- Owned by Eleojocafe
-- =============================================================================

-- Create storage buckets for media assets
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('profile-images', 'profile-images', true),
    ('cover-images', 'cover-images', true),
    ('post-images', 'post-images', true),
    ('post-videos', 'post-videos', true),
    ('post-audio', 'post-audio', true),
    ('chat-media', 'chat-media', false),
    ('story-media', 'story-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Access Policies (View)
CREATE POLICY "Public Access Profile Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Public Access Cover Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'cover-images');

CREATE POLICY "Public Access Post Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'post-images');

CREATE POLICY "Public Access Post Videos" ON storage.objects
    FOR SELECT USING (bucket_id = 'post-videos');

CREATE POLICY "Public Access Post Audio" ON storage.objects
    FOR SELECT USING (bucket_id = 'post-audio');

CREATE POLICY "Public Access Story Media" ON storage.objects
    FOR SELECT USING (bucket_id = 'story-media');

-- Authenticated Upload Policies
CREATE POLICY "Authenticated users can upload profile images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload cover images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'cover-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload post images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload post videos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'post-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload post audio" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'post-audio' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload chat media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'chat-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can access chat media" ON storage.objects
    FOR SELECT USING (bucket_id = 'chat-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload story media" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'story-media' AND auth.role() = 'authenticated');
