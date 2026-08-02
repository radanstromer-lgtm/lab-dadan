-- ============================================================
-- SEED DATA: Video Comments (berbagai kondisi)
-- ============================================================
-- Sample YouTube Video IDs (video publik populer):
--   dQw4w9WgXcQ  = Rick Astley - Never Gonna Give You Up
--   jNQXAC9IVRw  = Me at the zoo (video YouTube pertama)
--   9bZkp7q19f0  = PSY - Gangnam Style
--   kJQP7kiw5Fk  = Luis Fonsi - Despacito
--   JGwWNGJdvx8  = Ed Sheeran - Shape of You
--   OPf0YbXqDm0  = Mark Ronson - Uptown Funk
--   RgKAFK5djSk  = Wiz Khalifa - See You Again
--   e-ORhEE9VVg  = Taylor Swift - Blank Space
--   hT_nvWreIhg  = OneRepublic - Counting Stars
--   CevxZvSJLk8  = Katy Perry - Roar
-- ============================================================

INSERT INTO video_comments (
  id, content_type, content_id, parent_id,
  user_google_id, user_name, user_avatar_url, user_email,
  youtube_video_id, youtube_playlist_id,
  comment_text, duration_seconds,
  is_public, is_approved,
  created_at
) VALUES

-- ============================================================
-- KONDISI 1: Approved + Public (tampil ke semua pengunjung)
-- ============================================================
(
  'a1111111-1111-1111-1111-111111111111',
  'project', '01', NULL,
  'google_user_001', 'Budi Santoso', 
  'https://ui-avatars.com/api/?name=Budi+Santoso&background=4f46e5&color=fff', 
  'budi@example.com',
  'dQw4w9WgXcQ', 'PLtest001',
  'Project Focus.exe ini keren banget! Saya suka konsep brutalist UI-nya. Sangat membantu produktivitas.', 
  45,
  true, true,
  NOW() - INTERVAL '7 days'
),
(
  'a2222222-2222-2222-2222-222222222222',
  'project', '01', NULL,
  'google_user_002', 'Siti Rahayu',
  'https://ui-avatars.com/api/?name=Siti+Rahayu&background=ec4899&color=fff',
  'siti@example.com',
  'jNQXAC9IVRw', 'PLtest002',
  'Ide yang unik! Tapi saya rasa notification sound-nya bisa lebih halus.', 
  90,
  true, true,
  NOW() - INTERVAL '5 days'
),
(
  'a3333333-3333-3333-3333-333333333333',
  'project', '03', NULL,
  'google_user_003', 'Andi Wijaya',
  'https://ui-avatars.com/api/?name=Andi+Wijaya&background=059669&color=fff',
  'andi@example.com',
  '9bZkp7q19f0', 'PLtest003',
  'Neon Void sangat addictive! WASM performance-nya memang terasa smooth banget di browser.',
  120,
  true, true,
  NOW() - INTERVAL '3 days'
),

-- ============================================================
-- KONDISI 2: Approved + Private (hanya pemilik yang bisa lihat)
-- ============================================================
(
  'b1111111-1111-1111-1111-111111111111',
  'project', '02', NULL,
  'google_user_004', 'Dewi Lestari',
  'https://ui-avatars.com/api/?name=Dewi+Lestari&background=d97706&color=fff',
  'dewi@example.com',
  'kJQP7kiw5Fk', 'PLtest004',
  'Chromatica gradient engine-nya sangat impressive. Saya ingin coba integrate ke project saya.',
  60,
  false, true,
  NOW() - INTERVAL '4 days'
),

-- ============================================================
-- KONDISI 3: Pending approval (belum di-approve admin)
-- ============================================================
(
  'c1111111-1111-1111-1111-111111111111',
  'project', '04', NULL,
  'google_user_005', 'Reza Firmansyah',
  'https://ui-avatars.com/api/?name=Reza+Firmansyah&background=7c3aed&color=fff',
  'reza@example.com',
  'JGwWNGJdvx8', 'PLtest005',
  'NeuroBabble menarik, tapi fine-tuning pada blog posts lama agak hit-or-miss. Ada tips?',
  75,
  true, false,
  NOW() - INTERVAL '2 days'
),
(
  'c2222222-2222-2222-2222-222222222222',
  'project', '05', NULL,
  'google_user_006', 'Maya Putri',
  'https://ui-avatars.com/api/?name=Maya+Putri&background=dc2626&color=fff',
  'maya@example.com',
  'OPf0YbXqDm0', 'PLtest006',
  'MathArt.js ini luar biasa! Audio reactive-nya sangat responsive.',
  110,
  false, false,
  NOW() - INTERVAL '1 day'
),

-- ============================================================
-- KONDISI 4: Replies (1 level) — reply ke komentar Budi di project 01
-- ============================================================
(
  'r1111111-1111-1111-1111-111111111111',
  'project', '01', 'a1111111-1111-1111-1111-111111111111',
  'google_user_003', 'Andi Wijaya',
  'https://ui-avatars.com/api/?name=Andi+Wijaya&background=059669&color=fff',
  'andi@example.com',
  'RgKAFK5djSk', 'PLtest003',
  'Setuju sama Budi! Brutalist UI memang underrated. Saya juga pakai approach serupa.',
  30,
  true, true,
  NOW() - INTERVAL '6 days'
),
(
  'r2222222-2222-2222-2222-222222222222',
  'project', '01', 'a1111111-1111-1111-1111-111111111111',
  'google_user_001', 'Budi Santoso',
  'https://ui-avatars.com/api/?name=Budi+Santoso&background=4f46e5&color=fff',
  'budi@example.com',
  'e-ORhEE9VVg', 'PLtest001',
  'Thanks Andi! Btw coba cek juga library yang saya pakai, link ada di deskripsi video.',
  25,
  true, true,
  NOW() - INTERVAL '5 days 12 hours'
),

-- ============================================================
-- KONDISI 5: Reply yang masih pending approval
-- ============================================================
(
  'r3333333-3333-3333-3333-333333333333',
  'project', '01', 'a2222222-2222-2222-2222-222222222222',
  'google_user_005', 'Reza Firmansyah',
  'https://ui-avatars.com/api/?name=Reza+Firmansyah&background=7c3aed&color=fff',
  'reza@example.com',
  'hT_nvWreIhg', 'PLtest005',
  'Siti, saya setuju soal notification. Harusnya ada opsi silent mode.',
  40,
  true, false,
  NOW() - INTERVAL '4 days'
),

-- ============================================================
-- KONDISI 6: Komentar di content_type lain (course)
-- ============================================================
(
  'd1111111-1111-1111-1111-111111111111',
  'course', 'web-fundamentals', NULL,
  'google_user_002', 'Siti Rahayu',
  'https://ui-avatars.com/api/?name=Siti+Rahayu&background=ec4899&color=fff',
  'siti@example.com',
  'CevxZvSJLk8', 'PLtest002',
  'Course ini sangat membantu pemula! Penjelasannya clear dan langkah-langkahnya mudah diikuti.',
  95,
  true, true,
  NOW() - INTERVAL '10 days'
),

-- ============================================================
-- KONDISI 7: Tanpa comment_text (video only, no caption)
-- ============================================================
(
  'e1111111-1111-1111-1111-111111111111',
  'project', '06', NULL,
  'google_user_004', 'Dewi Lestari',
  'https://ui-avatars.com/api/?name=Dewi+Lestari&background=d97706&color=fff',
  'dewi@example.com',
  'dQw4w9WgXcQ', 'PLtest004',
  NULL,
  55,
  true, true,
  NOW() - INTERVAL '8 days'
);

-- ============================================================
-- Update projects agar beberapa punya comments_enabled = true
-- ============================================================
UPDATE projects SET comments_enabled = true WHERE id IN ('01', '03', '05', '06');
UPDATE projects SET comments_enabled = false WHERE id IN ('02', '04', '07', '08');
