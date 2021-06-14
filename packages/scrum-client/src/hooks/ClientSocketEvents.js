/* eslint-disable no-console */
import io from 'socket.io-client';
import { EVENT } from 'scrum-common';
import { API_CONSTANTS } from '../constants';

/**
 * Initiate socket communication.
 * @param {string} uri The uri of the IO server, default value is ${API_BASE_URL}
 */
const ClientSocketEvents = (ioUri = API_CONSTANTS.API_BASE_URL) => {
  const socket = io(ioUri);
  console.log('client--connectionSocket to: ', ioUri, ' with socketId', socket.id);
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
    console.log('client--disconnectSocket from: ', ioUri, ' with socketId', socket.id);
    if (socket) socket.disconnect();
  };
  const onRoomMessages = cb => {
    console.log('onRoomMessages');
    socket.on(EVENT.SEND_MESSAGE, data => {
      console.log('onRoomMessages send message', data);
      return cb(null, data);
    });
  };
  const onUserJoined = cb => {
    console.log('onUserJoined');
    socket.on(EVENT.USER_JOINED, data => cb(data.users));
  };
  const onStoryUpdate = cb => {
    console.log('onStoryUpdate');
    socket.on(EVENT.STORY_UPDATE, data => cb(data.story));
  };
  const onStoryVotesUpdate = cb => {
    console.log('onStoryVotesUpdate');
    socket.on(EVENT.STORY_VOTES_UPDATE, data => {
      console.log('onStoryVotesUpdate-data', data);
      return cb(data.storyVotes);
    });
  };
  const setRoomStory = ({ room, story }) => {
    console.log('setRoomStory', room, story);
    socket.emit(EVENT.STORY_UPDATE, { room, story });
  };
  const setRoomStoryVote = ({ room, user, vote }) => {
    console.log('setRoomStoryVote', room, user, vote);
    socket.emit(EVENT.STORY_VOTES_UPDATE, { room, user, vote });
  };

  const sendMessageToRoom = (room, message) => {
    console.log('sendMessageToRoom', room, message);
    socket.emit(EVENT.SEND_MESSAGE, { room, message });
  };

  return {
    socket,
    onUserJoined,
    joinToRoom,
    disconnectSocket,
    onRoomMessages,
    sendMessageToRoom,
    onStoryUpdate,
    onStoryVotesUpdate,
    setRoomStoryVote,
    setRoomStory,
  };
};

export default ClientSocketEvents;
