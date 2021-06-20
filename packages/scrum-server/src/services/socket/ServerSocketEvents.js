const { EVENT } = require('scrum-common');
const ServerSocketState = require('./ServerSocketState');
const { Logger } = require('../../utils/Logger');
/**
 * Server socket events, handles the different socket events.
 *
 * @param {Object} io - The socket io instance.
 * @return {function} - socket
 */
const ServerSocketEvents = io => {
  const logger = Logger(__filename);
  logger.info(`Initializing socket state`);
  const socketState = ServerSocketState();

  return socket => {
    const onJoinUserToRoom = ({ room, user }) => {
      logger.debug(`onJoinUserToRoom {${EVENT.USER_JOINED}} on room {${room.id}}`);
      socket.join(room.id);
      const roomUpdated = socketState.assignUserToRoom(room, user);
      const users = Array.from(roomUpdated.users.values());
      logger.info(`onJoinUserToRoom room has {${users.length}} participants`);
      io.to(room.id).emit(EVENT.USER_JOINED, { room, users });
    };

    const onSendMessageToRoom = ({ room, message }) => {
      const roomI = socketState.getRoom(room);
      const users = Array.from(roomI.users.values());
      logger.debug(
        `onSendMessageToRoom {${EVENT.SEND_MESSAGE}} with payload {${message}} on room {${room.id}} to {${users.length}} users`
      );
      // TODO retrieve title, subtitle
      io.to(room.id).emit(EVENT.SEND_MESSAGE, {
        message,
        room: { id: roomI.id, title: `Scrum Session ${room.id}`, subtitle: '', users },
      });
    };
    const onStoryUpdate = ({ room, story }) => {
      logger.debug(
        `onStoryUpdate {${EVENT.STORY_UPDATE}} on room {${room.id}} with story {${story.storyTitle}}`
      );
      const roomI = socketState.setRoomStory(room, story);
      io.to(room.id).emit(EVENT.STORY_UPDATE, { room: roomI, story });
    };
    const onStoryVotesUpdate = ({ room, user, vote }) => {
      logger.info(
        `onStoryVotesUpdate {${EVENT.STORY_VOTES_UPDATE}} on room {${room.id}} with vote ${vote} `
      );
      const storyVotes = socketState.setRoomStoryVote(room, user, vote);

      io.to(room.id).emit(EVENT.STORY_VOTES_UPDATE, { room, storyVotes: Array.from(storyVotes) });
    };

    return { onJoinUserToRoom, onSendMessageToRoom, onStoryUpdate, onStoryVotesUpdate };
  };
};
module.exports = ServerSocketEvents;
