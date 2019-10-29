const http = require('http');
const pg = require('pg');

const app = require('./src/app');

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
  return console.log('Successfully connected to the database');
});

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(config.port || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);
