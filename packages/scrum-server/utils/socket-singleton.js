const socketIo = require('socket.io');
const { EVENT } = require('scrum-common');

const { SocketEvents } = require('../src/socket/SocketEvents');

class SocketService {

  constructor(server) {
    this.io = socketIo(server);
    console.log("--server--SocketService");
    const socketEventIO = SocketEvents(this.io);

    this.io.on(EVENT.CONNECTION, socket => {
      console.log("--server--connection");
      const socketEvent  = socketEventIO(socket);
      socket.on(EVENT.JOIN, socketEvent.joinUserToRoom);
      socket.on(EVENT.SEND_MESSAGE, socketEvent.sendMessageToRoom);
      socket.on(EVENT.STORY_UPDATE, socketEvent.onStoryUpdate);
      socket.on(EVENT.STORY_VOTES_UPDATE, socketEvent.onStoryVotesUpdate);
      socket.on(EVENT.DISCONNECT, () => {
        console.log("--server--disconnect");
      });

      socket.on('hi', async (jsonData) => {
        console.log("--server--hi", JSON.stringify(jsonData));
        try {
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