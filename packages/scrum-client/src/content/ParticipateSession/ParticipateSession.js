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
// import SocketEvents from '../../hooks/SocketEvents';
import useSocket from '../../hooks/useSocket';
import { API_CONSTANTS } from '../../constants';
import './ParticipateSession.css';

const getPlanningSession = (roomId, setSessionInformation) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    fetch(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomId}`,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // eslint-disable-next-line

          setSessionInformation(data.sessionInformation);
          //           allowUnauthenticated: true
          // cardDeck: "0, 1, 2, 4, 8, 16, 32, 64, ?, I, C"
          // title: "Planning 27 December 2020"
          // userStoriesCreationMethod: "manual"

          console.log(data);
        } else {
          console.log('error');
          // setApiResponse(data.message);
        }
      });
  } catch (e) {
    // console.error(`=====> error:${e}`);
    console.log('error', e);
    // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
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
  const { socketEvents, messages, setStory, users } = useSocket(roomId);
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
          <TeamList title="Team members" users={users} />
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
