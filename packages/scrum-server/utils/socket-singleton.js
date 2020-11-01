const socket = require('socket.io');

const SocketSingleton = (function () {
  this.io = null;
  this.configure = function (server) {
    console.log('configuring socket.io');
    this.io = socket(server);
  };

  return this;
})();

module.exports = SocketSingleton;
