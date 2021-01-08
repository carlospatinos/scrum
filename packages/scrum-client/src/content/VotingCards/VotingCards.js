/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS, DECKS } from '../../constants';
import ClickableCard from '../../components/ClickableCard';
import GridGenerator from '../../components/GridGenerator';
import useSocket from '../../hooks/useSocket';
import { Request } from '../../util';
import './VotingCards.css';
import { useAuthState } from '../../context';

const handleSpecificCardToggleKeyboard = event => {
  // eslint-disable-next-line
  console.log(event.target.id);
};

function getPlanningSession(setCardDeckParam, roomId, setSessionInformation) {
  try {
    Request.get(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomId}`
    ).then(serviceResponse => {
      if (serviceResponse && serviceResponse.success && serviceResponse.sessionInformation) {
        setSessionInformation(serviceResponse.sessionInformation);
        setCardDeckParam(DECKS.byLabels(serviceResponse.sessionInformation.cardDeck).values);
        // TODO - handle error , sessionInformation not present
      }
    });
  } catch (e) {
    // console.error(e);
  }
}

export default function Cards() {
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
      vote: event.target.id,
    });
  };

  return (
    <Container>
      <br />
      {roomId === undefined ? (
        <h1>Invalid room</h1>
      ) : (
        <>
          <h4>{sessionInformation ? sessionInformation.title : ''}</h4>
          Room: {roomId}
          <br />
          Card Deck: {sessionInformation ? sessionInformation.cardDeck : ''}
          <br />
          Current User story: {story ? story.storyTitle : ' &lt;Provided by Admin&gt;'}
          <br />
          <GridGenerator columns={4}>
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
