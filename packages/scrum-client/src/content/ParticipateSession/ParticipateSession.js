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
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { END_POINTS } from 'scrum-common';
import TeamList from '../../components/TeamList';
import useSocket from '../../hooks/useSocket';
import { API_CONSTANTS } from '../../constants';
import { Request } from '../../util';
import './ParticipateSession.css';

const getPlanningSession = (roomId, setSessionInformation) => {
  try {
    Request.get(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomId}`
    ).then(data => setSessionInformation(data.sessionInformation));
  } catch (e) {
    console.log('error', e);
    // TODO this error happen if API is not available but business errors like length of password go above. how to handle and display those?
  }
};

const handleDeleteSession = e => console.log(e);

export default function ParticipateSession() {
  const { t } = useTranslation();
  const { roomId } = useParams();
  // const [response, setResponse] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [sessionInformation, setSessionInformation] = useState();
  const { socketEvents, setStory, users, storyVotes } = useSocket(roomId);
  useEffect(() => {
    getPlanningSession(roomId, setSessionInformation);
  }, [roomId]);

  if (!sessionInformation || !users) {
    return <Spinner animation="border" />;
  }

  const handleStartSession = e => {
    socketEvents.setRoomStory({
      room: { id: roomId },
      story: { storyTitle, storyDescription },
    });
    setStory({ storyTitle, storyDescription });
    console.log(e);
  };
  const handleEndSession = e => {
    // setStory({storyTitle:"", storyDescription:""});
    console.log(e);
  };

  return (
    <Container className="ParticipateSession">
      <Row>
        <Col>
          <h1>{sessionInformation.title}</h1>{' '}
          <Button variant="danger" onClick={handleDeleteSession}>
            {t('ParticipateSession.btnDeleteSession')}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Form>
              <Form.Group controlId="formStory">
                <Form.Label> {t('ParticipateSession.lblStory')}</Form.Label>
                <Form.Control
                  placeholder={t('ParticipateSession.lblStoryPlaceHolder')}
                  onChange={e => setStoryTitle(e.target.value)}
                  value={storyTitle}
                />
              </Form.Group>
              <Form.Group controlId="fromDescription">
                <Form.Label>{t('ParticipateSession.lblDescription')}</Form.Label>
                <Form.Control
                  placeholder={t('ParticipateSession.lblDescriptionPlaceHolder')}
                  onChange={e => setStoryDescription(e.target.value)}
                  value={storyDescription}
                />
              </Form.Group>
              <ButtonToolbar className="mb-2 mr-2">
                <ButtonGroup className="mr-2">
                  <Button variant="primary" type="button" onClick={handleStartSession}>
                    {t('ParticipateSession.btnStartSession')}
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <Button variant="danger" type="button" onClick={handleEndSession}>
                    {t('ParticipateSession.btnEndSession')}
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div> Display voting results / list of users</div>
          <TeamList title="Team members" users={users} storyVotes={storyVotes} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div> QR code to continue inviting?</div>
        </Col>
      </Row>
    </Container>
  );
}
