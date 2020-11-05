const socketIo = require('socket.io');

class SocketService {

  constructor(server) {
    this.io = socketIo(server);
    this.io.on('connect', socket => {
      let userToGroupMap = new Map();
      console.log('user connected to server');

      socket.on('disconnect', () => {
        console.log('user disconnected to server')
      });

      socket.on('createGroup', function (jsonData) {
        console.log('json ' + JSON.stringify(jsonData));
        userToGroupMap[jsonData.email] = jsonData.uniqueGroupId;
        socket.join(userToGroupMap[jsonData.email]);
      });

      socket.on('hi', async (jsonData) => {
        console.log('message from client: ' + JSON.stringify(jsonData));

        try {
          //this.io.in('12345').emit('message', "big announcement");
          this.io.sockets.in(userToGroupMap[jsonData.email]).emit('message', "big announcement");
        } catch (e) {
          console.log(e);
        }
        socket.emit('message', 'hello friends!');
      });
    });

  }

  getInstance() {
    return this;
  }

  emiter(event, body) {
    if (body)
      this.io.emit(event, body);
  }
}

module.exports = SocketService;