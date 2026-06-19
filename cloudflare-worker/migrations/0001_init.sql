-- WWI Careers — initial schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS jobs (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  department      TEXT NOT NULL DEFAULT '',
  location        TEXT NOT NULL DEFAULT '',
  employment_type TEXT NOT NULL DEFAULT 'Full Time',
  experience      TEXT NOT NULL DEFAULT '',
  salary_range    TEXT NOT NULL DEFAULT '',
  skills          TEXT NOT NULL DEFAULT '',          -- comma separated
  description     TEXT NOT NULL DEFAULT '',
  deadline        TEXT,                              -- ISO date
  status          TEXT NOT NULL DEFAULT 'OPEN',      -- OPEN | ARCHIVED | CLOSED
  published       INTEGER NOT NULL DEFAULT 1,       -- 0/1
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_jobs_status     ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_published  ON jobs(published);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

CREATE TABLE IF NOT EXISTS applications (
  id              TEXT PRIMARY KEY,
  job_id          TEXT,                              -- nullable for "General Application"
  job_title       TEXT,                              -- snapshot of title at apply time
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  location        TEXT,
  linkedin        TEXT,
  portfolio       TEXT,
  education       TEXT,
  university      TEXT,
  graduation_year TEXT,
  experience      TEXT,
  current_role    TEXT,
  current_company TEXT,
  cover_letter    TEXT,
  resume_key      TEXT NOT NULL,                     -- R2 object key
  resume_name     TEXT NOT NULL,
  resume_size     INTEGER NOT NULL,
  resume_type     TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'NEW',       -- NEW | SHORTLISTED | INTERVIEW | HIRED | REJECTED
  notes           TEXT NOT NULL DEFAULT '',
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_apps_status     ON applications(status);
CREATE INDEX IF NOT EXISTS idx_apps_job_id     ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_apps_created_at ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apps_email      ON applications(email);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT OR IGNORE INTO settings (key, value) VALUES
  ('company_name', 'Work Wizards Innovations'),
  ('email',        'careers@wwi.org.in'),
  ('phone',        ''),
  ('linkedin',     ''),
  ('instagram',    ''),
  ('logo_url',     '');
