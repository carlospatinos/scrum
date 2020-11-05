import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function ParticipateSession() {
  const { id } = useParams();
  // const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:3000');

    socket.on('connect', () => {
      // socket.join(id);
      // and then later
      console.log(`client user connected ${id}`);
      socket.emit('hi', 'holas');
      socket.on('message', function (data) {
        console.log(`new message: ${data}`);
      });
    });

    socket.on('disconnect', () => {
      console.log('client user disconnected');
    });
  }, [id]);

  return <div>Now showing post {id}</div>;
}
