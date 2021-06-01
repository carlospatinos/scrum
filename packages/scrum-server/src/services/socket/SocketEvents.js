/* eslint-disable */
// TODO fix eslint
const { EVENT } = require('scrum-common');
const { SocketState } = require('./SocketState');
const {Logger} = require('../../utils/Logger');
const SocketEvents = io => {
  const socketState = SocketState();
  const logger = Logger();

  return socket => {
    const joinUserToRoom = ({ room, user }) => {
      socket.join(room.id);
      const roomUpdated = socketState.joinUserToRoom(room, user);
      const users =  Array.from(roomUpdated.users.values());
      logger.debug(`joinUserToRoom on event {${EVENT.USER_JOINED}} in room {${room.id}} for user {${user._id}}`);
      io.to(room.id).emit(EVENT.USER_JOINED, {room, users});
    };

    const sendMessageToRoom = ({ room, message }) => {
      const _room = socketState.getRoom(room);
      const users = Array.from(_room.users.values());
      logger.debug(`sendMessageToRoom on event {${EVENT.SEND_MESSAGE}} with payload {${message}} in room {${room.id}} for user {${user.id}}`);
      // todo retrieve title, subtitle
      io.to(room.id).emit(EVENT.SEND_MESSAGE, {
        message: message,
        room: { id: _room.id, title: 'Scrum Session ' + room.id, subtitle: '', users: users },
      });
    };
    const onStoryUpdate = ({ room, story }) => {
      const _room = socketState.setRoomStory(room, story);
      logger.debug(`onStoryUpdate on event {${EVENT.STORY_UPDATE}} in room {${room.id}} for story {${JSON.stringify(story)}}`);
      io.to(room.id).emit(EVENT.STORY_UPDATE, {room:_room, story});

    };
    const onStoryVotesUpdate = ({ room, user, vote }) => {
      const storyVotes = socketState.setRoomStoryVote(room, user, vote);
      logger.debug(`onStoryVotesUpdate on event {${EVENT.STORY_VOTES_UPDATE}} in room {${room.id}} with storyVotes {${JSON.stringify(storyVotes)}} - vote ${vote}`);
      io.to(room.id).emit(EVENT.STORY_VOTES_UPDATE, {room, storyVotes});
    };

    return { joinUserToRoom, sendMessageToRoom, onStoryUpdate, onStoryVotesUpdate };
  };
};
module.exports = SocketEvents;
