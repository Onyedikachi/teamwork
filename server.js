const http = require('http');
const app = require('./src/app');
const terminate = require('./src/helpers/terminate');

require('dotenv').config({ path: '.env' });
const config = require('./src/config');
const logger = require('./src/config/logger');

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

const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
});

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  logger.info(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
});
server.listen(port);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
