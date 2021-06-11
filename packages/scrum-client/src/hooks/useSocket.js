import { useEffect, useState } from 'react';
import { API_CONSTANTS } from '../constants';
import ClientSocketEvents from './ClientSocketEvents';
import { useAuthState } from '../context';

const useSocket = (roomId, socketServerURL = API_CONSTANTS.API_BASE_URL) => {
  console.log('useSocket', roomId, socketServerURL);

  const [users, setUsers] = useState([]);
  const [socketEvents, setSocketEvents] = useState();
  const userDetails = useAuthState();

  useEffect(() => {
    console.log('useSocket-useEffect-init', roomId, socketServerURL, userDetails.user);

    const socketEventsRef = ClientSocketEvents();
    const { joinToRoom, disconnectSocket, onUserJoined } = socketEventsRef;
    joinToRoom({ room: { id: roomId }, user: userDetails.user });
    onUserJoined(setUsers);
    setSocketEvents(socketEventsRef);
    return () => {
      console.log('useSocket-useEffect-end');
      disconnectSocket();
    };
  }, [roomId, socketServerURL, userDetails.user]);
  return {
    socketEvents,
    users,
  };
};
const useScrumStory = roomId => {
  const { socketEvents, users } = useSocket(roomId);
  const [story, setStory] = useState();
  const [storyVotes, setStoryVotes] = useState([]);
  console.log('useScrumStory', roomId, story, storyVotes);

  useEffect(() => {
    if (socketEvents) {
      const { onStoryUpdate, onStoryVotesUpdate } = socketEvents;

      console.log('useScrumStory-useEffect-init');

      onStoryUpdate(setStory);
      onStoryVotesUpdate(setStoryVotes);
    }

    return () => {
      console.log('useScrumStory-useEffect-end');
    };
  }, [socketEvents]);
  return {
    users,
    story,
    storyVotes,
    setStory,
    setStoryVotes,
    socketEvents,
  };
};
export { useSocket, useScrumStory };
