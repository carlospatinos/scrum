/* eslint-disable */
// TODO fix eslint
const { SocketState } = require('./SocketState');
const { EVENT } = require('scrum-common');
const SocketEvents = io => {
  const socketState = SocketState();

  return socket => {
    const joinUserToRoom = ({ room, user }) => {
      socket.join(room.id);
      socketState.joinUserToRoom(room, user);
    };
    const sendMessageToRoom = ({ room, message }) => {
      const _room = socketState.getRoom(room);
      const users = Array.from(_room.users.values());
      // todo retrieve title, subtitle
      io.to(room.id).emit(EVENT.SEND_MESSAGE, {
        message: message,
        room: { id: _room.id, title: 'Scrum Session ' + room.id, subtitle: '', users: users },
      });
    };

    return { joinUserToRoom, sendMessageToRoom };
  };
};
module.exports = { SocketEvents };
