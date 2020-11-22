import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function ParticipateSession() {
  const { id } = useParams();
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3000');
    socket.on('connect', () => {
      socket.emit('createGroup', { uniqueGroupId: id, email: 'personal@email.com' });
      socket.emit('hi', { email: 'personal@email.com', message: '1- sending first message' });
      // socket.join('12345');
      // socket.to('12345').emit('hi', '1- sending first message');

      // and then later
      // console.log(`client user connected ${id}`);
      /* eslint-disable */
      socket.on('message', function (data) {
        // console.log(`new message: ${data}`);
        setResponse(data);
      });
    });

    // socket.on('disconnect', () => {
    //   console.log('client user disconnected');
    // });
  }, [id]);

  return (
    <Container className="NotFound">
      Message from server: {response}
      <br /> on group {id}
    </Container>
  );
}
