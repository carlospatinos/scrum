/* eslint-disable */
// TODO fix eslint
// TODO Is this really used?
const socketIo = require('socket.io');
const { EVENT } = require('scrum-common');
const {Logger} = require('../../utils/Logger');
const ServerSocketEvents  = require('./ServerSocketEvents');

class ServerSingletonSocketService {
  constructor(server) {
    this.logger = Logger(__filename);
    this.io = socketIo(server);
    this.logger.info('starting socket service');
    const socketEventIO = ServerSocketEvents(this.io);

    this.io.on(EVENT.CONNECTION, socket => {
      this.logger.info('socket connected');
      const socketEvent  = socketEventIO(socket);
      socket.on(EVENT.JOIN, socketEvent.onJoinUserToRoom);
      socket.on(EVENT.SEND_MESSAGE, socketEvent.onSendMessageToRoom);
      socket.on(EVENT.STORY_UPDATE, socketEvent.onStoryUpdate);
      socket.on(EVENT.STORY_VOTES_UPDATE, socketEvent.onStoryVotesUpdate);
      socket.on(EVENT.DISCONNECT, () => {
        this.logger.info("socket  disconnected");
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

module.exports = ServerSingletonSocketService;
