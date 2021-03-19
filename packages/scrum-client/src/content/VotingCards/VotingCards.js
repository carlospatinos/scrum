/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, ListGroup, Badge } from 'react-bootstrap';
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

  return (
    <Container>
      <br />
      {roomId === undefined ? (
        <h1>Invalid room</h1>
      ) : (
        <>
          <ListGroup>
            <ListGroup.Item>
              <h4>
                {sessionInformation ? sessionInformation.title : ''}{' '}
                <Badge variant="secondary">Member view</Badge>
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              User story: {story ? story.storyTitle : ' &lt;Provided by Admin&gt;'}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {story ? story.storyDescription : ' &lt;Provided by Admin&gt;'}
            </ListGroup.Item>
          </ListGroup>

          {/* Room: {roomId}
          <br />
          Card Deck: {sessionInformation ? sessionInformation.cardDeck : ''}
          <br /> */}

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
        </>
      )}
    </Container>
  );
}
