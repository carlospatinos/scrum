/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Badge, Spinner, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DECKS } from '../../constants';
import ClickableCard from '../../components/ClickableCard';
import GridGenerator from '../../components/GridGenerator';
import useSocket from '../../hooks/useSocket';
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
  const { story, socketEvents } = useSocket(roomId);
  const userDetails = useAuthState();

  useEffect(() => {
    getPlanningSession(setCardDeck, roomId, setSessionInformation);
  }, [setCardDeck, roomId]);

  const handleSpecificCardToggle = event => {
    socketEvents.setRoomStoryVote({
      room: { id: roomId },
      user: userDetails.user,
      vote: cardDeck.find(card => card.id === event.target.id).val,
    });
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
    <Container>
      <ListGroup>
        <ListGroup.Item>
          <h4>
            {sessionInformation ? sessionInformation.title : ''}{' '}
            <Badge variant="secondary">{t('VotingCards.lblMemberView')}</Badge>
          </h4>
          {isStoryActive ? (
            <Timer formatValue={value => `${value < 10 ? `0${value}` : value} `}>
              <Timer.Hours />:
              <Timer.Minutes />:
              <Timer.Seconds />
            </Timer>
          ) : (
            <div />
          )}
        </ListGroup.Item>
        {!isStoryActive ? (
          <Button variant="primary" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            {t('VotingCards.storyNotProvided')}
          </Button>
        ) : (
          <>
            <ListGroup.Item>
              {t('VotingCards.lblStoryTitle')}{' '}
              {isStoryActive ? story.storyTitle : t('VotingCards.plcHdlStoryTitle')}
            </ListGroup.Item>
            <ListGroup.Item>
              {t('VotingCards.lblStoryDescription')}{' '}
              {isStoryActive ? story.storyDescription : t('VotingCards.plcHdlStoryDescription')}
            </ListGroup.Item>
          </>
        )}
      </ListGroup>

      {/* Room: {roomId}
          <br />
          Card Deck: {sessionInformation ? sessionInformation.cardDeck : ''}
          <br /> */}
      {isStoryActive ? (
        <GridGenerator columns={6}>
          {cardDeck.map(card => {
            return (
              <ClickableCard
                image={card.image}
                clickableFunction={handleSpecificCardToggle}
                keyboardFunction={handleSpecificCardToggleKeyboard}
                key={card.val}
                id={card.id}
              />
            );
          })}
        </GridGenerator>
      ) : (
        <div />
      )}
    </Container>
  );
}
