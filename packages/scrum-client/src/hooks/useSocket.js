import { useEffect, useState } from 'react';
import { API_CONSTANTS } from '../constants';
import SocketEvents from './SocketEvents';
import { useAuthState } from '../context';

const useSocket = (roomId, socketServerURL = API_CONSTANTS.API_BASE_URL) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [story, setStory] = useState();
  const [storyVotes, setStoryVotes] = useState([]);
  const [socketEvents, setSocketEvents] = useState();
  const userDetails = useAuthState();

  // const setStory = _story => _setStory(_story); useRef
  // const setStoryVotes = _storyVotes => _setStoryVotes(_storyVotes);

  useEffect(() => {
    const socketEventsRef = SocketEvents();
    const {
      joinToRoom,
      disconnectSocket,
      onRoomMessages,
      onUserJoined,
      onStoryUpdate,
      onStoryVotesUpdate,
    } = socketEventsRef;
    const { email, fullName } = userDetails.user;
    joinToRoom({ room: { id: roomId }, user: { fullName, email } });
    onRoomMessages((err, data) => {
      setMessages(data);
    });
    onUserJoined(setUsers);
    onStoryUpdate(setStory);
    onStoryVotesUpdate(setStoryVotes);

    setSocketEvents(socketEventsRef);
    return () => {
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
