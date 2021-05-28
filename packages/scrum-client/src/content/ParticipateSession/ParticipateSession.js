/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Timer from 'react-compound-timer';
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
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TeamList from '../../components/TeamList';
import useSocket from '../../hooks/useSocket';
import { PlanningSessionAPI, UserStoryAPI } from '../../api';
import { DECKS, PATHS } from '../../constants';

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
  const [showModal, setShowModal] = useState(false);
  const [showStartUserStory, setShowStartUserStory] = useState(true);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [validUserStory, setValidUserStory] = useState(false);
  const [sessionInformation, setSessionInformation] = useState();
  const [summaryVotes, setSummaryVotes] = useState({});
  const { socketEvents, setStory, users, storyVotes } = useSocket(roomId);
  const [fullUrlToJoin, setFullUrlToJoin] = useState('');
  const userDetails = useAuthState();
  const history = useHistory();

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (roomId && roomId !== ':roomId') {
      getPlanningSession(roomId, setSessionInformation);
      const url = window.location.href.split('/').slice(0, 3).join('/'); // ${API_CONSTANTS.API_BASE_URL}
      const joinSessionPath = PATHS.SESSION_JOIN.replace(':roomId?', roomId);
      setFullUrlToJoin(`${url}${joinSessionPath}`);
      console.log(url + joinSessionPath);
    }
  }, [roomId]);

  useEffect(() => {
    if (!!sessionInformation && sessionInformation.cardDeck !== undefined) {
      const cardDeck = DECKS.byLabels(sessionInformation.cardDeck);
      setSummaryVotes(cardDeck.getSummaryVote(storyVotes));
    }
  }, [sessionInformation, storyVotes]);

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

  const handleStartVoting = e => {
    socketEvents.setRoomStory({
      room: { id: roomId },
      story: { storyTitle, storyDescription, isStoryActive: true },
    });
    setStory({ storyTitle, storyDescription });
    setShowStartUserStory(false);
    console.log(e);
  };
  const handleEndVoting = e => {
    try {
      console.log(storyVotes);
      socketEvents.setRoomStory({
        room: { id: roomId },
        story: { storyTitle, storyDescription, isStoryActive: false },
      });
      storyVotes.splice(0, storyVotes.length);

      if (summaryVotes !== undefined) {
        UserStoryAPI.post({
          planningSessionId: roomId,
          title: storyTitle,
          description: storyDescription,
          chosenEstimatedValue: summaryVotes.avgVote,
          minEstimatedValue: summaryVotes.minVote,
          maxEstimatedValue: summaryVotes.maxVote,
        });
      }
    } catch (error) {
      console.log('error', MediaError);
    }

    setStoryTitle('');
    setStoryDescription('');
    setValidUserStory(false);
    setShowStartUserStory(true);
    console.log(e);
  };
  const handleEndSession = e => {
    setShowModal(true);
    console.log(e);
  };
  const handleConfirmEndSession = () => {
    history.push(PATHS.SESSION_SUMMARY);
  };

  return (
    <Container className="ParticipateSession">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('ParticipateSession.mdlTtlEndSession')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('ParticipateSession.mdlMsgEndSession')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmEndSession}>
            {t('ParticipateSession.mdlBtnEndSession')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <h4>
            {sessionInformation.title}{' '}
            <Badge variant="secondary">{t('ParticipateSession.badgeAdminView')}</Badge>
          </h4>{' '}
        </Col>
        <Col>
          <Button variant="danger" type="button" onClick={handleEndSession}>
            {t('ParticipateSession.btnEndSession')}
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <div>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder={t('ParticipateSession.lblStory')}
                    onChange={e => handleUserStoryTitle(e.target.value)}
                    readOnly={!showStartUserStory}
                    value={storyTitle}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder={t('ParticipateSession.lblDescription')}
                    onChange={e => setStoryDescription(e.target.value)}
                    readOnly={!showStartUserStory}
                    value={storyDescription}
                  />
                </Col>
                <Col>
                  <ButtonToolbar className="mb-2 mr-2">
                    {showStartUserStory && (
                      <ButtonGroup className="mr-2">
                        <Button
                          variant="primary"
                          type="button"
                          onClick={handleStartVoting}
                          disabled={!validUserStory}
                        >
                          {t('ParticipateSession.btnStartVoting')}
                        </Button>
                      </ButtonGroup>
                    )}
                    {!showStartUserStory && (
                      <ButtonGroup className="mr-2">
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              {t('ParticipateSession.tooltipEndSession')}
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Button variant="secondary" type="button" onClick={handleEndVoting}>
                              {t('ParticipateSession.btnEndVoting')}
                            </Button>
                          </span>
                        </OverlayTrigger>{' '}
                        <h3>
                          <Timer formatValue={value => `${value < 10 ? `0${value}` : value} `}>
                            <Timer.Hours />:
                            <Timer.Minutes />:
                            <Timer.Seconds />
                          </Timer>
                        </h3>
                      </ButtonGroup>
                    )}
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
            admin={{ id: userDetails.user }}
            storyVotes={storyVotes}
            summaryVotes={summaryVotes}
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
