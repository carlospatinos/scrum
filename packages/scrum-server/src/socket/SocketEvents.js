const { EVENT } = require('scrum-common');
const { SocketState } = require('./SocketState');
const SocketEvents = io => {
  const socketState = SocketState();

  return socket => {
    const joinUserToRoom = ({ room, user }) => {
      console.log("joinUserToRoom", room, user);
      socket.join(room.id);
      const roomUpdated = socketState.joinUserToRoom(room, user);
      const users =  Array.from(roomUpdated.users.values());
      io.to(room.id).emit(EVENT.USER_JOINED, {room, users});
    };

    const sendMessageToRoom = ({ room, message }) => {
      console.log("sendMessageToRoom", room, message);
      const _room = socketState.getRoom(room);
      const users = Array.from(_room.users.values());
      // todo retrieve title, subtitle
      io.to(room.id).emit(EVENT.SEND_MESSAGE, {
        message: message,
        room: { id: _room.id, title: 'Scrum Session ' + room.id, subtitle: '', users: users },
      });
    };
    const onStoryUpdate = ({ room, story }) => {
      console.log("onStoryUpdate", room, story);
      const _room = socketState.setRoomStory(room, story);
      io.to(room.id).emit(EVENT.STORY_UPDATE, {room:_room, story});
    };
    const onStoryVotesUpdate = ({ room, user, vote }) => {
      console.log("onStoryVotesUpdate", room, user, vote);
      // const storyVotes = socketState.setRoomStoryVote(room, user, vote);
      // io.to(room.id).emit(EVENT.STORY_VOTES_UPDATE, {room, storyVotes});
    };

    return { joinUserToRoom, sendMessageToRoom, onStoryUpdate, onStoryVotesUpdate };
  };
};
module.exports = { SocketEvents };
