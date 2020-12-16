/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
// import { API_BASE_URL } from './constants/apiConstants';

const sendMessage = (msg = 'test') => console.log('Send Message:', msg);

export default function ClientComponent() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('chat message', msg => {
      console.log('CCL', msg);
    });

    socket.on('FromAPI', data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      Its <time dateTime={response}>{response}</time>
      <button type="button" onClick={sendMessage} />
    </p>
  );
}
