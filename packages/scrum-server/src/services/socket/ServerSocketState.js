/* eslint-disable */
const {Logger} = require('../../utils/Logger');
// TODO fix eslint
const buildRoom = ({ id, users = new Map(), storyVotes = new Map(), story = '' }) => ({
  id,
  users,
  storyVotes,
  story,
});

const ServerSocketState = (initialState = []) => {
  const logger = Logger(__filename);
  const rooms = new Map(...initialState);
  logger.info(`Initializing rooms`);

  const addRoomIfDoesNotExists = (room) => {
    if (!rooms.has(room.id)) {
      rooms.set(room.id, buildRoom(room.id));
      logger.debug(`addRoom building room {${room.id}}`);
    }
    return rooms.get(room.id);
  };

  const assignUserToRoom = (room, user) => {
    const userId = user._id;
    const _room = addRoomIfDoesNotExists({ id: room.id });
    if (!_room.users.has(userId)) {
      logger.debug(`assignUserToRoom adding user {${userId}} to the room {${room.id}}`);
      _room.users.set(userId, user);
    }
    return rooms.get(room.id);
  };

  const setRoomStory = (room, story) => {
    logger.debug(`setRoomStory on ${room.id} with ${story.storyTitle}`);
    const _room = rooms.get(room.id);
    _room.story = story;
    return _room;
  };

  const setRoomStoryVote = (room, user, vote) => {
    const userId = user._id;
    logger.debug(`setRoomStoryVote on room {${room.id}} for user {${userId}} with value {${vote}}`);
    const _room = rooms.get(room.id);
    _room.storyVotes.set(userId, vote);
    return _room.storyVotes;
  };
  const getRoom = room => {
    const foundRoom = rooms.get(room.id);
    logger.debug(`getRoom for room_id {${room.id}} found ${foundRoom}`);
    return foundRoom;
  };

  return { getRoom, assignUserToRoom, setRoomStory, setRoomStoryVote };
};

module.exports = { ServerSocketState };