/* eslint-disable */
const {Logger} = require('../../utils/Logger');
// TODO fix eslint
const buildRoom = ({ id, users = new Map(), storyVotes = new Map(), story = '' }) => ({
  id,
  users,
  storyVotes,
  story,
});

const SocketState = (initialState = []) => {
  const logger = Logger();
  const rooms = new Map(...initialState);
  logger.debug(`--server--state-SocketState rooms initial state`);
  const addRoom = room => {
    if (!rooms.has(room.id)) {
      logger.debug(`--server--state-SocketState creating room {${room.id}}`);
      rooms.set(room.id, buildRoom(room.id));
    }
    return rooms.get(room.id);
  };

  const joinUserToRoom = (room, user) => {
    const userId = user._id;
    if (rooms.has(room.id)) {
      const _room = rooms.get(room.id);
      logger.debug(`joinUserToRoom the room {${room}} exists already`);
      if (!_room.users.has(userId)) {
        logger.debug(`joinUserToRoom adding user {${userId}} to the room {${_room.id}}`);
        _room.users.set(userId, user);
      }
    } else {
      const users = new Map();
      users.set(userId, user);
      logger.debug(`joinUserToRoom creating room {${room.id}} and adding user {${userId}}`);
      addRoom({ id: room.id, users });
    }
    return rooms.get(room.id);
  };
  const setRoomStory = (room, story) => {
    logger.debug('--server--state-setRoomStory', room, story);
    const _room = rooms.get(room.id);
    _room.story = story;
    return _room;
  };

  const setRoomStoryVote = (room, user, vote) => {
    const userId = user._id;
    logger.debug(`--server-state-setRoomStoryVote on room {${room}} for user {${user}} with value {${vote}}`);
    const _room = rooms.get(room.id);
    _room.storyVotes.set(userId, vote);
    return _room.storyVotes;
  };
  const getRoom = room => {
    logger.debug(`--server-state-getRoom for room {${room.id}}`);
    return rooms.get(room.id);
  };

  return { getRoom, joinUserToRoom, setRoomStory, setRoomStoryVote };
};

module.exports = { SocketState };
