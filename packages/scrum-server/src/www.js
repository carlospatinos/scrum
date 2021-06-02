#!/usr/bin/env node
require('babel-core/register');
require('babel-polyfill');
/* eslint-disable no-var */

/**
 * Module dependencies.
 */

var app = require('./app');
var pjson = require('../package.json');
var HttpServer = require('./api/server');
var SocketService = require('./services/socket/socket-singleton');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
console.log(process.env.PORT);
var port = normalizePort(process.env.PORT || '3000');
var server = HttpServer({ app, port, pjson });
app.set('port', port);
app.set('socketService', new SocketService(server));
