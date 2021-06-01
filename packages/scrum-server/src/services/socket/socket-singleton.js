/* eslint-disable */
// TODO fix eslint
// TODO Is this really used?
const socketIo = require('socket.io');
const { EVENT } = require('scrum-common');
const {Logger} = require('../../utils/Logger');
const SocketEvents  = require('./SocketEvents');

class SocketService {
  constructor(server) {
    this.logger = Logger();
    this.io = socketIo(server);
    this.logger.info('--server--SocketService');
    const socketEventIO = SocketEvents(this.io);

    this.io.on(EVENT.CONNECTION, socket => {
      this.logger.info('--server--connection');
      const socketEvent  = socketEventIO(socket);
      socket.on(EVENT.JOIN, socketEvent.joinUserToRoom);
      socket.on(EVENT.SEND_MESSAGE, socketEvent.sendMessageToRoom);
      socket.on(EVENT.STORY_UPDATE, socketEvent.onStoryUpdate);
      socket.on(EVENT.STORY_VOTES_UPDATE, socketEvent.onStoryVotesUpdate);
      socket.on(EVENT.DISCONNECT, () => {
        
        this.logger.info("--server--disconnect");
      });

      socket.on('hi', async jsonData => {
        this.logger.info('--server--hi', JSON.stringify(jsonData));
        try {
          // TODO userToGroupMap is undefined
          this.io.sockets.in(userToGroupMap[jsonData.email]).emit('message', 'big announcement');
        } catch (e) {
          this.logger.error(e);
        }
        socket.emit('message', 'hello friends!');
      });
    });
  }

  getInstance() {
    return this;
  }

  emiter(event, body) {
    if (body) this.io.emit(event, body);
  }
}

module.exports = SocketService;
