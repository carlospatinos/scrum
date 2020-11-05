const socketIo = require('socket.io');

class SocketService {
  constructor(server) {
    this.io = socketIo(server);
    this.io.on('connect', socket => {
      console.log('user connected to server');

      socket.on('disconnect', () => {
        console.log('user disconnected to server')
      });
      
      socket.on('hi', () => {
        console.log('hi to server');
        this.io.emit('message', "hi return from server to client");
      });
    });
    
  }

  getInstance(){
    return this;
  }

  emiter(event, body) {
    if (body)
      this.io.emit(event, body);
  }
}

module.exports = SocketService;