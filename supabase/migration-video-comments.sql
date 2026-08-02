-- ============================================================
-- MIGRATION: video_comments table
-- ============================================================

CREATE TABLE video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Polymorphic content reference (project, course, dll)
  content_type TEXT NOT NULL,          -- 'project' | 'course' | 'lab-note' | ...
  content_id TEXT NOT NULL,            -- ID dari konten terkait
  
  -- Reply support (1 level)
  parent_id UUID REFERENCES video_comments(id) ON DELETE CASCADE,
  
  -- User info
  user_google_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar_url TEXT,
  user_email TEXT,
  
  -- YouTube reference
  youtube_video_id TEXT NOT NULL,
  youtube_playlist_id TEXT,
  
  -- Content
  comment_text TEXT,                   -- opsional: teks pendamping video
  duration_seconds INTEGER,            -- durasi video dalam detik
  
  -- Visibility (diatur oleh komentator via website)
  is_public BOOLEAN DEFAULT FALSE,     -- false = hanya pemilik yg bisa lihat
                                       -- true = semua pengunjung bisa lihat
  
  -- Moderation (diatur oleh admin via Supabase dashboard)
  is_approved BOOLEAN DEFAULT FALSE,   -- false = menunggu moderasi
                                       -- true = sudah disetujui admin
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query berdasarkan konten
CREATE INDEX idx_video_comments_content ON video_comments(content_type, content_id);

-- Index untuk query replies
CREATE INDEX idx_video_comments_parent ON video_comments(parent_id);

-- Index untuk query visibilitas publik
CREATE INDEX idx_video_comments_visibility ON video_comments(is_approved, is_public);

-- RLS policies
ALTER TABLE video_comments ENABLE ROW LEVEL SECURITY;

-- Komentar publik yang sudah approved bisa dibaca siapa saja
CREATE POLICY "Public approved read" ON video_comments 
  FOR SELECT USING (is_approved = true AND is_public = true);

-- Insert/update/delete dilakukan via API Routes dengan service role key
-- (karena auth dihandle NextAuth, bukan Supabase Auth)

-- ============================================================
-- ALTER: Tambah kolom comments_enabled pada tabel projects
-- ============================================================

ALTER TABLE projects ADD COLUMN IF NOT EXISTS comments_enabled BOOLEAN DEFAULT FALSE;
