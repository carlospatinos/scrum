const SocketState = (initialState = []) => {
  const rooms = new Map(...initialState);
  console.log('--server--state-SocketState', rooms);

  const addRoom = room => {
    if (!rooms.has(room.id)) {
      rooms.set(room.id, {
        id: room.id,
        users: new Map(),
        storyVotes: new Map(),
        story: undefined,
      });
    }
    return rooms.get(room.id);
  };

  const addUserToRoom = (room, user) => {
    addRoom(room);
    return rooms.get(room.id);
  };

  const joinUserToRoom = (room, user) => {
    // console.log('--server--state-joinUserToRoom',room,user);
    if (rooms.has(room.id)) {
      const _room = rooms.get(room.id);
      if (!_room.users.has(user.email)) {
        _room.users.set(user.email, user);
      }
    } else {
      const users = new Map();
      users.set(user.email, user);
      rooms.set(room.id, { id: room.id, users });
    }
    return rooms.get(room.id);
  };
  const setRoomStory = (room, story) => {
    console.log('--server--state-setRoomStory2',rooms, room, story);
    const _room = rooms.get(room.id);
    _room.story = story;
    return _room;
  };

  const setRoomStoryVote = (room, user, vote) => {
    console.log('--server--state-voteStory',room, user, vote);
    const _room = rooms.get(room.id);
    _room.storyVotes.set(user.email, vote);
    _room.storyVotes = new Map();
    return _room.storyVotes;
  };
  const getRoom = room => {
    return rooms.get(room.id);
  };

  return { getRoom, joinUserToRoom , setRoomStory, setRoomStoryVote };
};

module.exports = { SocketState };
