CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'admin' or 'viewer'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS flags (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,          -- e.g. "new-checkout-flow"
  description TEXT,
  enabled BOOLEAN NOT NULL DEFAULT false,
  rollout_percentage INT NOT NULL DEFAULT 0 CHECK (rollout_percentage BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experiments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  variant_a_name TEXT NOT NULL,                   -- Name of Variant A

  variant_a_conversions INT NOT NULL DEFAULT 0,   -- Number of successful conversions for Variant A

  variant_a_visitors INT NOT NULL DEFAULT 0,      -- Number of users who saw Variant A

  variant_b_name TEXT NOT NULL,                   -- Name of Variant B

  variant_b_conversions INT NOT NULL DEFAULT 0,   -- Number of successful conversions for Variant B

  variant_b_visitors INT NOT NULL DEFAULT 0       -- Number of users who saw Variant B
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);