-- Create authors table
CREATE TABLE IF NOT EXISTS public.authors (
    id text PRIMARY KEY,
    name text NOT NULL,
    initials text,
    book_title text,
    book_id text,
    bio text,
    back_cover text,
    photo_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to authors"
    ON public.authors FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated users to insert authors"
    ON public.authors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update authors"
    ON public.authors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete authors"
    ON public.authors FOR DELETE TO authenticated USING (true);

-- Storage bucket for author photos
INSERT INTO storage.buckets (id, name, public) VALUES ('authors', 'authors', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Give public access to authors photos" ON storage.objects FOR SELECT USING (bucket_id = 'authors');
CREATE POLICY "Allow authenticated uploads to authors photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'authors');
CREATE POLICY "Allow authenticated updates to authors photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'authors');
CREATE POLICY "Allow authenticated deletes to authors photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'authors');
