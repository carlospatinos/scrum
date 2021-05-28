import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_CONSTANTS, PATHS } from '../../constants';
import { CommonFunctions } from '../../util';
import './ShareSession.css';

export default function ShareSession() {
  const [sessionToJoin, setSessionToJoin] = useState('');
  const [fullUrlToJoin, setFullUrlToJoin] = useState('');

  const history = useHistory();
  const { t } = useTranslation();

  const startSession = () => {
    history.push(sessionToJoin);
  };

  // TODOIs this a common function? Where to put it?
  function generateQR() {
    const planningRoomId = CommonFunctions.getValueFromLocalStorage2(
      API_CONSTANTS.PLANNING_ROOM_ID
    );
    // CommonFunctions.getValueFromLocalStorage
    // TODO DELETE roomid?
    const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_CONSTANTS.API_BASE_URL}
    const joinSessionPath = PATHS.SESSION_JOIN.replace(':roomId?', planningRoomId);

    setSessionToJoin(`${joinSessionPath}`);
    setFullUrlToJoin(`${url}${joinSessionPath}`);
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
