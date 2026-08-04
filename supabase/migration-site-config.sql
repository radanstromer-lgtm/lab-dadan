-- ============================================================
-- MIGRATION: site_config table for site settings and flags
-- ============================================================

CREATE TABLE IF NOT EXISTS site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed: section visibility default
INSERT INTO site_config (key, value, description)
VALUES (
  'section_visibility',
  '{"hero": true, "projects": true, "courses": true, "tech_radar": true, "lab_notes": true, "graveyard": true}',
  'Mengatur tampil/tidaknya section di homepage. Set false untuk menyembunyikan.'
)
ON CONFLICT (key) DO NOTHING;

-- RLS policies
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Semua orang (anonymous public/public client) bisa SELECT
CREATE POLICY "Public read site_config" ON site_config
  FOR SELECT USING (true);
