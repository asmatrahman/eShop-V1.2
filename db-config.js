const { Pool } = require('pg');
const conn = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'eShop_db'
});

module.exports = conn;