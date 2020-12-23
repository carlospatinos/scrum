import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container } from 'react-bootstrap';
import { PLANNING_ROOM_ID } from '../../constants/apiConstants';

export default function JoinSession() {
  const [sessionToJoin, setSessionToJoin] = useState('');
  function generateQR() {
    const planningRoomId = localStorage.getItem(PLANNING_ROOM_ID);
    // TODO DELETE roomid?
    const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_BASE_URL}
    setSessionToJoin(`${url}/session/${planningRoomId}`);
  }

  useEffect(() => {
    generateQR();
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
