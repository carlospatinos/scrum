import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

export default function ClientComponent() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(`${process.env.REACT_APP_API_URL}/api`);
    socket.on('FromAPI', data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      Its <time dateTime={response}>{response}</time>
    </p>
  );
}
