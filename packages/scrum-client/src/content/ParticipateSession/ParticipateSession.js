import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import TeamList from '../../components/TeamList';
import {
  initiateSocket,
  disconnectSocket,
  subscribeToRoom,
  sendMessage,
} from '../../hooks/SocketEvents';

export default function ParticipateSession() {
  const { id: roomId } = useParams();
  const location = useLocation();
  const [response, setResponse] = useState('');
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const [room, setRoom] = useState({
    id: roomId,
    title: 'Session 123',
    subtitle: '....',
    users: [],
  });

  useEffect(() => {
    if (roomId) {
      initiateSocket({ room: { id: roomId }, user: { name: email, email } });
    }
    subscribeToRoom((err, data) => {
      // eslint-disable-next-line
      console.log('client--subscribeToRoom-cb', err, data);
      if (err) return;
      setRoom({ ...data.room });
      setResponse(data.message);
    });
    sendMessage({ id: roomId }, 'Welcome to room');

    return () => {
      disconnectSocket();
    };
  }, [email, roomId]);

  return (
    <Container className="NotFound">
      Message from server: {response}
      <br /> on group {roomId}
      <TeamList title={room.title} subtitle={room.subtitle} users={room.users} />
    </Container>
  );
}
