/* eslint-disable */
// TODO fix eslint
const { EVENT } = require('scrum-common');
const { SocketState } = require('./SocketState');
const {Logger} = require('../../utils/Logger');
const SocketEvents = io => {
  const socketState = SocketState();
  const logger = Logger(__filename);

  return socket => {
    const onJoinUserToRoom = ({ room, user }) => {
      socket.join(room.id);
      const roomUpdated = socketState.assignUserToRoom(room, user);
      const users =  Array.from(roomUpdated.users.values());
      logger.debug(`{${EVENT.USER_JOINED}} event on room {${room.id}} resulting in room with {${users.length}} participants`);
      io.to(room.id).emit(EVENT.USER_JOINED, {room, users});
    };

    const onSendMessageToRoom = ({ room, message }) => {
      const _room = socketState.getRoom(room);
      const users = Array.from(_room.users.values());
      logger.debug(`{${EVENT.SEND_MESSAGE}} event with payload {${message}} on room {${room.id}} to {${users.length}} users`);
      // todo retrieve title, subtitle
      io.to(room.id).emit(EVENT.SEND_MESSAGE, {
        message: message,
        room: { id: _room.id, title: 'Scrum Session ' + room.id, subtitle: '', users: users },
      });
    };
    const onStoryUpdate = ({ room, story }) => {
      const _room = socketState.setRoomStory(room, story);
      logger.debug(`{${EVENT.STORY_UPDATE}} event on room {${room.id}} with story {${JSON.stringify(story)}}`);
      io.to(room.id).emit(EVENT.STORY_UPDATE, {room:_room, story});

    };
    const onStoryVotesUpdate = ({ room, user, vote }) => {
      const storyVotes = socketState.setRoomStoryVote(room, user, vote);
      logger.debug(`{${EVENT.STORY_VOTES_UPDATE}} event on room {${room.id}} with vote ${vote} resulting in storyVotes {${JSON.stringify(storyVotes)}} - `);
      io.to(room.id).emit(EVENT.STORY_VOTES_UPDATE, {room, storyVotes});
    };

    return { onJoinUserToRoom, onSendMessageToRoom, onStoryUpdate, onStoryVotesUpdate };
  };
};
module.exports = SocketEvents;
