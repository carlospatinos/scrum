import { useEffect, useState } from 'react';
import { API_CONSTANTS } from '../constants';
import ClientSocketEvents from './ClientSocketEvents';
import { useAuthState } from '../context';

const useSocket = (roomId, socketServerURL = API_CONSTANTS.API_BASE_URL) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [story, setStory] = useState();
  const [storyVotes, setStoryVotes] = useState([]);
  const [socketEvents, setSocketEvents] = useState();
  const userDetails = useAuthState();

  useEffect(() => {
    // eslint-disable-next-line
    console.log('WARNING!!! creating new connection?. ');
    const socketEventsRef = ClientSocketEvents();
    const {
      joinToRoom,
      disconnectSocket,
      onRoomMessages,
      onUserJoined,
      onStoryUpdate,
      onStoryVotesUpdate,
    } = socketEventsRef;
    joinToRoom({ room: { id: roomId }, user: userDetails.user });
    onRoomMessages((err, data) => {
      setMessages(data);
    });
    onUserJoined(setUsers);
    onStoryUpdate(setStory);
    onStoryVotesUpdate(setStoryVotes);

    setSocketEvents(socketEventsRef);
    return () => {
      // eslint-disable-next-line
      console.log('WARNING!!!  executing disconnection. ');
      disconnectSocket();
    };
  }, [roomId, socketServerURL, userDetails.user, story, storyVotes]);
  return {
    socketEvents,
    messages,
    setMessages,
    users,
    story,
    storyVotes,
    setStory,
    setStoryVotes,
  };
};
export default useSocket;
