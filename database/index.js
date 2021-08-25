const pgp = require('pg-promise')();
const config = require('../config.js');

// Preparing the connection details:
const cn = {
  host: `${config.host}`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: `${config.password}`
};
// Creating a new database instance from the connection details:
const db = pgp(cn);

module.exports = db;