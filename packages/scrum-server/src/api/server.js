/**
 * Module dependencies.
 */

const debug = require('debug')('scrum:server');
const http = require('http');

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(addr) {
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(port, error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Create HTTP server.
 */

const HttpServer = ({ app, port, pjson }) => {
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port, () => {
    console.log(`Server App v. ${pjson.version} listening at http://scrum-app-local.com:${port}`);
    process.env.REACT_APP_VERSION = pjson.version;

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  });
  server.on('error', error => onError(port, error));
  server.on('listening', () => onListening(server.address()));
  return server;
};

module.exports = HttpServer;
