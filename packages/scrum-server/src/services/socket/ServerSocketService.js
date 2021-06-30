const socketIo = require('socket.io');
const { EVENT } = require('scrum-common');
const { Logger } = require('../../utils/Logger');
const ServerSocketEvents = require('./ServerSocketEvents');

/**
 * Sever socket singleton service.
 *
 * @class ServerSocketService
 */
class ServerSocketService {
  constructor(server) {
    this.logger = Logger(__filename);
    this.io = socketIo(server);

    this.logger.info('starting socket service');
    const socketEventIO = ServerSocketEvents(this.io);

    this.io.on(EVENT.CONNECTION, socket => {
      this.logger.info(`socket  connected [${socket.id}]`);
      const socketEvent = socketEventIO(socket);
      socket.on(EVENT.JOIN, socketEvent.onJoinUserToRoom);
      socket.on(EVENT.OPEN_ROOM, socketEvent.onRoomOpened);
      socket.on(EVENT.SEND_MESSAGE, socketEvent.onSendMessageToRoom);
      socket.on(EVENT.STORY_UPDATE, socketEvent.onStoryUpdate);
      socket.on(EVENT.STORY_VOTES_UPDATE, socketEvent.onStoryVotesUpdate);
      socket.on(EVENT.CLOSE_ROOM, socketEvent.onRoomClosed);
      socket.on(EVENT.DISCONNECT, () => {
        this.logger.info(`socket  disconnected [${socket.id}]`);
      });
    });
  }

  getInstance() {
    this.logger.info('getInstance');
    return this;
  }

  emitter(event, body) {
    this.logger.info('emitting event');
    if (body) this.io.emit(event, body);
  }
}

module.exports = ServerSocketService;
