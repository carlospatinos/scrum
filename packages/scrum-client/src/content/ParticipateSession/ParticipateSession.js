/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Form,
  ButtonToolbar,
  ButtonGroup,
  Modal,
  Badge,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TeamList from '../../components/TeamList';
import useSocket from '../../hooks/useSocket';
import { PlanningSessionAPI } from '../../api';
import { PATHS } from '../../constants';
import { useAuthState } from '../../context';
import './ParticipateSession.css';

const getPlanningSession = (roomId, setSessionInformation) => {
  try {
    PlanningSessionAPI.get(roomId).then(setSessionInformation);
  } catch (e) {
    console.log('error', e);
    // TODO this error happen if API is not available but business errors like length of password go above. how to handle and display those?
  }
};

export default function ParticipateSession() {
  const { t } = useTranslation();
  const { roomId } = useParams();
  // const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [validUserStory, setValidUserStory] = useState(false);
  const [storyDescription, setStoryDescription] = useState('');
  const [sessionInformation, setSessionInformation] = useState();
  const { socketEvents, setStory, users, storyVotes } = useSocket(roomId);
  const [fullUrlToJoin, setFullUrlToJoin] = useState('');
  const userDetails = useAuthState();

  useEffect(() => {
    if (roomId && roomId !== ':roomId') {
      getPlanningSession(roomId, setSessionInformation);
      const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_CONSTANTS.API_BASE_URL}
      const joinSessionPath = PATHS.SESSION_JOIN.replace(':roomId?', roomId);
      setFullUrlToJoin(`${url}${joinSessionPath}`);
      console.log(url + joinSessionPath);
    }
  }, [roomId]);

  if (!sessionInformation || !users) {
    return <Spinner animation="border" />;
  }

  const handleUserStoryTitle = e => {
    setStoryTitle(e);
    if (e !== '') {
      setValidUserStory(true);
    } else {
      setValidUserStory(false);
    }
  };
  const handleStartSession = e => {
    socketEvents.setRoomStory({
      room: { id: roomId },
      story: { storyTitle, storyDescription },
    });
    setStory({ storyTitle, storyDescription });
    console.log(e);
  };
  const handleEndSession = e => {
    setShowModal(true);
    console.log(e);
  };

  return (
    <Container className="ParticipateSession">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('ParticipateSession.mdlTtlEndSession')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('ParticipateSession.mdlMsgEndSession')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            {t('ParticipateSession.mdlBtnEndSession')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <h4>
            {sessionInformation.title} <Badge variant="secondary">Admin view</Badge>
          </h4>{' '}
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder={t('ParticipateSession.lblStory')}
                    onChange={e => handleUserStoryTitle(e.target.value)}
                    value={storyTitle}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder={t('ParticipateSession.lblDescription')}
                    onChange={e => setStoryDescription(e.target.value)}
                    value={storyDescription}
                  />
                </Col>
                <Col>
                  <ButtonToolbar className="mb-2 mr-2">
                    <ButtonGroup className="mr-2">
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleStartSession}
                        disabled={!validUserStory}
                      >
                        {t('ParticipateSession.btnStartSession')}
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup className="mr-2">
                      <Button variant="danger" type="button" onClick={handleEndSession}>
                        {t('ParticipateSession.btnEndSession')}
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* TODO admin.id is null? error in console */}
          <TeamList
            title="Team Summary"
            sessionInformation={sessionInformation}
            users={users}
            admin={{ id: userDetails.user.id }}
            storyVotes={storyVotes}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            URL to join: <a href={fullUrlToJoin}>{fullUrlToJoin}</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
