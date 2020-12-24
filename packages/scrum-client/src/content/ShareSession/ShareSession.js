import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PLANNING_ROOM_ID } from '../../constants/apiConstants';
import './ShareSession.css';

export default function ShareSession() {
  const [sessionToJoin, setSessionToJoin] = useState('');
  const [fullUrlToJoin, setFullUrlToJoin] = useState('');

  const history = useHistory();

  const startSession = () => {
    history.push(sessionToJoin);
  };

  function generateQR() {
    const planningRoomId = localStorage.getItem(PLANNING_ROOM_ID);
    // TODO DELETE roomid?
    const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_BASE_URL}
    setSessionToJoin(`/session/${planningRoomId}`);
    setFullUrlToJoin(`${url}/session/${planningRoomId}`);
  }

  useEffect(() => {
    generateQR();
  }, []);

  return (
    <Container className="ShareSession">
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <h4>Invite members</h4>
          <p>Share the information below and when you are ready</p>
          <Button variant="primary" size="lg" block onClick={startSession}>
            Start session
          </Button>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Let them scan the QR (If you are sharing the screen).
          <br />
          <br />
          <p className="ShareSessionQR">
            <QRCode value={fullUrlToJoin} />
          </p>
          Or share this link with them.
          <br />
          <p>{fullUrlToJoin}</p>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
