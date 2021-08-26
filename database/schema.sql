CREATE TABLE IF NOT EXISTS searches (
  id SERIAL PRIMARY KEY,
  url VARCHAR (500) UNIQUE,
  title VARCHAR (50) UNIQUE,
  tablename VARCHAR (50) UNIQUE
);

-- CREATE TABLE IF NOT EXISTS <title> (
--   id SERIAL PRIMARY KEY,
--   linurlk VARCHAR (300) UNIQUE,
--   text VARCHAR (100),
--   date VARCHAR (100)
-- );
-- CREATE INDEX link_idx ON listings (link);