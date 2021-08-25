CREATE TABLE IF NOT EXISTS searches (
  id SERIAL PRIMARY KEY,
  link VARCHAR (500) UNIQUE,
  title VARCHAR (50)
);

-- CREATE TABLE IF NOT EXISTS listings (
--   id SERIAL PRIMARY KEY,
--   link VARCHAR (300) UNIQUE,
--   text VARCHAR (100),
--   date VARCHAR (100)
-- );
-- CREATE INDEX link_idx ON listings (link);