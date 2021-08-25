CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  text VARCHAR (100),
  link VARCHAR (300),
  date VARCHAR (100)
);

-- sudo -u postgres psql < database/schema.sql