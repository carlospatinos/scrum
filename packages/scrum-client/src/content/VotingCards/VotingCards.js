/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';
import { useParams } from 'react-router-dom';
import { Container, Badge, Spinner, Button, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DECKS } from '../../constants';
import ClickableCard from '../../components/ClickableCard';
import { useScrumStory } from '../../hooks/useSocket';
import './VotingCards.css';
import { useAuthState } from '../../context';
import { PlanningSessionAPI } from '../../api';

const handleSpecificCardToggleKeyboard = event => {
  // eslint-disable-next-line
  console.log(event.target.id);
};

function getPlanningSession(setCardDeckParam, roomId, setSessionInformation) {
  try {
    PlanningSessionAPI.get(roomId).then(data => {
      setSessionInformation(data);
      setCardDeckParam(DECKS.byLabels(data.cardDeck).values);
      // TODO - handle error , data not present
    });
  } catch (e) {
    // console.error(e);
  }
}

export default function VotingCards() {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const [cardDeck, setCardDeck] = useState([]);
  const [sessionInformation, setSessionInformation] = useState({});
  // TODO remove next line and keep this
  // const { story, socketEvents } = useSocket(roomId);
  const { story, socketEvents } = useScrumStory(roomId);

  const userDetails = useAuthState();

  useEffect(() => {
    getPlanningSession(setCardDeck, roomId, setSessionInformation);
  }, [setCardDeck, roomId]);

  const handleSpecificCardToggle = event => {
    const vote = cardDeck.find(card => card.id === event.target.id).val;
    socketEvents.setRoomStoryVote({
      room: { id: roomId },
      user: userDetails.user,
      vote,
    });
    setCardDeck(cardDeck.map(card => ({ ...card, isSelected: card.id === event.target.id })));
  };
  const isStoryActive = story && story.isStoryActive;

  if (roomId === undefined) {
    return (
      <Container>
        <h1>{t('VotingCards.invalidRoomTitle')}</h1>
      </Container>
    );
  }

  return (
    <Row className="VotingCards">
      <Col xs={0} md={1} lg={2} className="mx-auto" />
      <Col xs={12} md={10} lg={8} className="mx-auto">
        <Row>
          <Col xs={12} className="mx-auto">
            <h4>
              {sessionInformation ? sessionInformation.title : ''}{' '}
              <Badge variant="secondary">{t('VotingCards.lblMemberView')}</Badge>
            </h4>
          </Col>
        </Row>

        {!isStoryActive ? (
          <Row>
            <Col xs={12} className="mx-auto">
              <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                {t('VotingCards.storyNotProvided')}
              </Button>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col xs={12} className="mx-auto  d-flex flex-row-reverse">
                {isStoryActive ? (
                  <h4>
                    <Timer formatValue={value => `${value < 10 ? `0${value}` : value} `}>
                      <Timer.Hours />:
                      <Timer.Minutes />:
                      <Timer.Seconds />
                    </Timer>
                  </h4>
                ) : (
                  <div />
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="mx-auto">
                {t('VotingCards.lblStoryTitle')}{' '}
                {isStoryActive ? story.storyTitle : t('VotingCards.plcHdlStoryTitle')}
              </Col>
              <Col xs={12} className="mx-auto">
                {t('VotingCards.lblStoryDescription')}{' '}
                {isStoryActive ? story.storyDescription : t('VotingCards.plcHdlStoryDescription')}
              </Col>
            </Row>
          </>
        )}
        <br />
        <Row>
          {/* eslint-disable */}
        {isStoryActive ? (
          <>{cardDeck.map(card => {
            return (
              <Col key={card.id} className="box" xs={4} md={3} lg={3}>
                <ClickableCard
                  image={card.image}
                  text={card.text}
                  clickableFunction={handleSpecificCardToggle}
                  keyboardFunction={handleSpecificCardToggleKeyboard}
                  key={card.val}
                  id={card.id}
                  isSelected={card.isSelected}
                />
              </Col>
            )
          })}</>
        ) : (
          <div />
        )}
        { /* eslint-enable */}
        </Row>
      </Col>
      <Col xs={0} md={1} lg={2} className="mx-auto" />
    </Row>
  );
}
