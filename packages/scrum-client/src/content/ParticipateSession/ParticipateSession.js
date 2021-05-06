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
  const [storyTitle, setStoryTitle] = useState('');
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
                    onChange={e => setStoryTitle(e.target.value)}
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
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
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
