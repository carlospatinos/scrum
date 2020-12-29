import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_CONSTANTS } from '../../constants';
import './ShareSession.css';

export default function ShareSession() {
  const [sessionToJoin, setSessionToJoin] = useState('');
  const [fullUrlToJoin, setFullUrlToJoin] = useState('');

  const history = useHistory();
  const { t } = useTranslation();

  const startSession = () => {
    history.push(sessionToJoin);
  };

  function generateQR() {
    const planningRoomId = localStorage.getItem(API_CONSTANTS.PLANNING_ROOM_ID);
    // TODO DELETE roomid?
    const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_CONSTANTS.API_BASE_URL}
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
          <h4>{t('ShareSession.lblInviteMembers')}</h4>
          <p>{t('ShareSession.lblShareToJoin')}</p>
          <Button variant="primary" size="lg" block onClick={startSession}>
            {t('ShareSession.btnStartSession')}
          </Button>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          {t('ShareSession.lblLetScanQR')}
          <br />
          <br />
          <p className="ShareSessionQR">
            <QRCode value={fullUrlToJoin} />
          </p>
          {t('ShareSession.lblShareLink')}
          <br />
          <p>{fullUrlToJoin}</p>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
