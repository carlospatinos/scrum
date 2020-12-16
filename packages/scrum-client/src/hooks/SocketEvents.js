import io from 'socket.io-client';
import { API_BASE_URL } from '../constants/apiConstants';

let socket;
/**
 * Initiate socket communication joining a user to a room.
 * @param {Object} data The data sent to the event.
 * @param {Object} data.room The room object
 * @param {Object} data.user The user object.
 */
export const initiateSocket = data => {
  // console.log('client--initiateSocket', API_BASE_URL);
  // TODO - get io info from configuration.
  socket = io(`${API_BASE_URL}`);
  socket.emit('join', data);
};
export const disconnectSocket = () => {
  console.log('client--disconnectSocket');
  if (socket) socket.disconnect();
};
export const subscribeToRoom = cb => {
  console.log('client--subscribeToRoom');
  socket.on('send_message', data => {
    console.log('client--send_message', data);

    return cb(null, data);
  });
};
export const sendMessage = (room, message) => {
  if (socket) socket.emit('send_message', { room, message });
};
