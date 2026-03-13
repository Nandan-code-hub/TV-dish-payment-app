CREATE TABLE IF NOT EXISTS households (
  id UUID PRIMARY KEY,
  dish_id VARCHAR(20) UNIQUE NOT NULL,
  house_name TEXT NOT NULL,
  area TEXT,
  phone_optional TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY,
  household_id UUID NOT NULL REFERENCES households(id),
  amount INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('UPI', 'CASH')),
  transaction_id TEXT,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(household_id, month, year)
);

CREATE INDEX IF NOT EXISTS idx_household_month
  ON payments(household_id, month, year);
