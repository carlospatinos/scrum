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
      if (JSON.stringify(storyVotes) !== '{}') {
        setSummaryVotes(cardDeck.getSummaryVote(storyVotes));
      } else {
        console.log('storyVotes', storyVotes);
      }
    }
  }, [sessionInformation, storyVotes]);

  if (!sessionInformation || !users) {
    return (
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <Spinner animation="border" />
        </Col>
      </Row>
    );
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
        <Col xs={12} md={6} lg={8} className="mx-auto">
          <h4>
            {sessionInformation.title}{' '}
            <Badge variant="secondary">{t('ParticipateSession.badgeAdminView')}</Badge>
          </h4>{' '}
        </Col>
        <Col xs={5} md={3} lg={2} className="d-none d-md-block flex-row-reverse">
          <h4>
            <Timer formatValue={value => `${value < 10 ? `0${value}` : value} `}>
              <Timer.Hours />:
              <Timer.Minutes />:
              <Timer.Seconds />
            </Timer>
          </h4>
        </Col>
        <Col xs={5} md={3} lg={2} className="d-sm-block d-md-none flex-row-reverse">
          <h4>
            <Timer formatValue={value => `${value < 10 ? `0${value}` : value} `}>
              <Timer.Minutes />:
              <Timer.Seconds />
            </Timer>
          </h4>
        </Col>
        <Col xs={7} md={3} lg={2} className="mx-auto d-flex flex-row-reverse">
          <Button variant="danger" type="button" onClick={handleEndSession} className="btn-sm">
            {t('ParticipateSession.btnEndSession')}
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={3} lg={4} className="mx-auto">
          <Form.Control
            placeholder={t('ParticipateSession.lblStory')}
            onChange={e => handleUserStoryTitle(e.target.value)}
            readOnly={!showStartUserStory}
            value={storyTitle}
          />
        </Col>
        <Col xs={12} md={6} lg={6} className="mx-auto">
          <Form.Control
            placeholder={t('ParticipateSession.lblDescription')}
            onChange={e => setStoryDescription(e.target.value)}
            readOnly={!showStartUserStory}
            value={storyDescription}
          />
        </Col>
        <Col xs={12} md={3} lg={2} className="mx-auto d-flex flex-row-reverse">
          {showStartUserStory && (
            <Button
              variant="primary"
              type="button"
              onClick={handleStartVoting}
              disabled={!validUserStory}
              className="btn-sm"
            >
              {t('ParticipateSession.btnStartVoting')}
            </Button>
          )}
          {!showStartUserStory && (
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">{t('ParticipateSession.tooltipEndSession')}</Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button variant="secondary" type="button" onClick={handleEndVoting}>
                  {t('ParticipateSession.btnEndVoting')}
                </Button>
              </span>
            </OverlayTrigger>
          )}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <TeamList
            title={t('ParticipateSession.lblVotingSummary')}
            sessionInformation={sessionInformation}
            users={users}
            admin={{ id: userDetails.user }}
            storyVotes={storyVotes}
            summaryVotes={summaryVotes}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={6} md={4} lg={2} className="mx-auto">
          {t('ParticipateSession.lblMemberURL')}
        </Col>
        <Col sm={6} md={8} lg={10} className="mx-auto d-none d-md-block">
          {fullUrlToJoin}
        </Col>
        <Col xs={6} md={8} className="mx-auto d-sm-block d-md-none">
          <a href={fullUrlToJoin}>URL</a>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
