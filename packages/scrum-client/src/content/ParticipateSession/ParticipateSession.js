/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TeamList from '../../components/TeamList';
import {
  initiateSocket,
  disconnectSocket,
  subscribeToRoom,
  sendMessage,
} from '../../hooks/SocketEvents';
import { API_BASE_URL, USER } from '../../constants/apiConstants';
import './ParticipateSession.css';

const getPlanningSession = id => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    console.log('fetching');
    fetch(`${API_BASE_URL}/api/planningsession/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // eslint-disable-next-line
          console.log(data);
        } else {
          console.log('error');
          // setApiResponse(data.message);
        }
      });
  } catch (e) {
    // console.error(`=====> error:${e}`);
    console.log('error', e);
    // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
  }
};

export default function ParticipateSession() {
  const { id: roomId } = useParams();
  const [response, setResponse] = useState('');
  const [room, setRoom] = useState({
    id: roomId,
    title: 'Session 123',
    subtitle: '....',
    users: [],
  });

  useEffect(() => {
    const email = localStorage.getItem(USER.EMAIL) || 'fake@email.com';
    const fullName = localStorage.getItem(USER.FULL_NAME) || 'fake user';

    if (roomId) {
      getPlanningSession(roomId);
      initiateSocket({ room: { id: roomId }, user: { fullName, email } });
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
  }, [roomId]);

  return (
    <Container className="ParticipateSession">
      <br />
      {response}
      <TeamList title={room.title} subtitle={room.subtitle} users={room.users} />
    </Container>
  );
}
