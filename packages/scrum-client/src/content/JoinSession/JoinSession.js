import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function JoinSession() {
  const [sessionToJoin, setSessionToJoin] = useState('');
  function generateUUID() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      fetch(`${API_BASE_URL}/api/uuid`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // TODO this is different from dev and prod
          // http://localhost:4000

          setSessionToJoin(`${API_BASE_URL}/session/${data.uuid}`);
        });
    } catch (e) {
      // console.error(e);
    }
  }

  useEffect(() => {
    generateUUID();
  }, []);

  return (
    <Container className="NotFound">
      <h3>Invite members</h3>
      <p>
        Please share the following link with the members joining the session or if you are sharing
        the screen let them see the QR so they can join automatticaly
      </p>
      <QRCode value={sessionToJoin} />
      <br />
      <a href={sessionToJoin}>{sessionToJoin}</a>
    </Container>
  );
}
