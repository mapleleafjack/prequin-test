CREATE TABLE IF NOT EXISTS investors (
    id TEXT PRIMARY KEY,
    name TEXT,
    type TEXT,
    country TEXT,
    date_added TEXT,
    last_updated TEXT,
    UNIQUE(id)
);

CREATE TABLE IF NOT EXISTS commitments (
    id TEXT PRIMARY KEY,
    investor_id TEXT,
    asset_class TEXT,
    amount REAL,
    currency TEXT,
    FOREIGN KEY (investor_id) REFERENCES investors(id),
    UNIQUE(investor_id, asset_class, amount, currency)
);