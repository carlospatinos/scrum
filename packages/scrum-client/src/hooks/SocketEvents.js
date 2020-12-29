import io from 'socket.io-client';
import { EVENT } from 'scrum-common';
import { API_CONSTANTS } from '../constants';

/**
 * Initiate socket communication.
 * @param {string} uri The uri of the IO server, default value is ${API_BASE_URL}
 */
const SocketEvents = (ioUri = API_CONSTANTS.API_BASE_URL) => {
  const socket = io(ioUri);
  /**
   * Joins a user to a room.
   * @param {Object} data The data sent to the event.
   * @param {Object} data.room The room object
   * @param {Object} data.user The user object.
   */
  const joinToRoom = data => {
    socket.emit(EVENT.JOIN, data);
  };
  const disconnectSocket = () => {
    // eslint-disable-next-line
    console.log('client--disconnectSocket');
    if (socket) socket.disconnect();
  };
  const onRoomMessages = cb => {
    // eslint-disable-next-line
    console.log('client--onRoomMessages');
    socket.on(EVENT.SEND_MESSAGE, data => {
      // eslint-disable-next-line
      console.log('client--send_message', data);

      return cb(null, data);
    });
  };
  const sendMessageToRoom = (room, message) => {
    if (socket) socket.emit(EVENT.SEND_MESSAGE, { room, message });
  };

  return { joinToRoom, disconnectSocket, onRoomMessages, sendMessageToRoom };
};

export default SocketEvents;
