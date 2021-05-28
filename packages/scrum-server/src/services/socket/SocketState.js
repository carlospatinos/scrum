/* eslint-disable */
// TODO fix eslint
const buildRoom = ({ id, users = new Map(), storyVotes = new Map(), story = '' }) => ({
  id,
  users,
  storyVotes,
  story,
});

const SocketState = (initialState = []) => {
  const rooms = new Map(...initialState);
  console.log('--server--state-SocketState', rooms);
  const addRoom = room => {
    if (!rooms.has(room.id)) {
      rooms.set(room.id, buildRoom(room.id));
    }
    return rooms.get(room.id);
  };

  const joinUserToRoom = (room, user) => {
    const userId = user._id;
    if (rooms.has(room.id)) {
      const _room = rooms.get(room.id);
      if (!_room.users.has(userId)) {
        _room.users.set(userId, user);
      }
    } else {
      const users = new Map();
      users.set(userId, user);
      addRoom({ id: room.id, users });
    }
    return rooms.get(room.id);
  };
  const setRoomStory = (room, story) => {
    console.log('--server--state-setRoomStory2', room, story);
    const _room = rooms.get(room.id);
    _room.story = story;
    return _room;
  };

  const setRoomStoryVote = (room, user, vote) => {
    const userId = user._id;
    console.log('--server--state-voteStory', room, user, vote);
    const _room = rooms.get(room.id);
    _room.storyVotes.set(userId, vote);
    return _room.storyVotes;
  };
  const getRoom = room => {
    return rooms.get(room.id);
  };

  return { getRoom, joinUserToRoom, setRoomStory, setRoomStoryVote };
};

module.exports = { SocketState };
