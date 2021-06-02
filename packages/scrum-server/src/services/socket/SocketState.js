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
  const logger = Logger(__filename);
  const rooms = new Map(...initialState);
  logger.debug(`Initializing rooms state`);

  const addRoom = (room) => {
    if (!rooms.has(room.id)) {
      rooms.set(room.id, buildRoom(room.id));
      logger.debug(`addRoom creating room {${room.id}}`);
    }
    return rooms.get(room.id);
  };

  const assignUserToRoom = (room, user) => {
    const userId = user._id;
    if (rooms.has(room.id)) {
      const _room = rooms.get(room.id);
      logger.debug(`assignUserToRoom the room {${room.id}} already exists`);
      if (!_room.users.has(userId)) {
        _room.users.set(userId, user);
        logger.debug(`assignUserToRoom adding user {${userId}} to the room {${room.id}} resulting in rooms {${JSON.stringify(_room)}}`);
      }
    } else {
      const users = new Map();
      users.set(userId, user);
      // TODO why users are sent and not used in addRoom?
      logger.debug(`assignUserToRoom creating users for room {${room.id}} and adding user {${userId}} resulting in users {${JSON.stringify(users)}}`);
      addRoom({ id: room.id, users });
    }
    return rooms.get(room.id);
  };
  const setRoomStory = (room, story) => {
    logger.debug('setRoomStory', room, story);
    const _room = rooms.get(room.id);
    _room.story = story;
    return _room;
  };

  const setRoomStoryVote = (room, user, vote) => {
    const userId = user._id;
    logger.debug(`setRoomStoryVote on room {${room.id}} for user {${userId}} with value {${vote}}`);
    const _room = rooms.get(room.id);
    logger.debug(`setRoomStoryVote on room {${JSON.stringify(_room)}}`);
    _room.storyVotes.set(userId, vote);
    // _room.storyVotes.set('60b0cdc424f82090b806a36', '1');
    // _room.storyVotes.set('60b0cdc424f82090b806a36', '2');
    logger.debug(`setRoomStoryVote on room {${JSON.stringify(_room)}}, {${userId}}, {${vote}}`);
    return _room.storyVotes;
  };
  const getRoom = room => {
    const foundRoom = rooms.get(room.id);
    logger.debug(`getRoom for room_id {${room.id}} found ${foundRoom}`);
    return foundRoom;
  };

  return { getRoom, assignUserToRoom, setRoomStory, setRoomStoryVote };
};

module.exports = { SocketState };
