const pg = require('pg');
require('dotenv').config({ path: '.env' });
const config = require('./src/config');

const pool = new pg.Pool({
  user: config.db.user,
  host: config.db.host,
  port: config.db.port,
  password: config.db.password,
  database: config.db.database,
  idleTimeoutMillis: 30000,
  max: 10
});

pool.connect((err, db, done) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Subsequently connected to the database');
});

module.exports.pool = pool;
