/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS, DECKS } from '../../constants';
import ClickableCard from '../../components/ClickableCard';
import GridGenerator from '../../components/GridGenerator';
import useSocket from '../../hooks/useSocket';

import { useAuthState } from '../../context';

import './VotingCards.css';

const handleSpecificCardToggle = event => {
  // eslint-disable-next-line
  console.log(event.target.id);
};

const handleSpecificCardToggleKeyboard = event => {
  // eslint-disable-next-line
  console.log(event.target.id);
};

function getSessionInformation(setCardDeckParam, roomIdParam, setSessionInformation) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    fetch(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomIdParam}`,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          console.log('getSessionInformation', data);
          setSessionInformation(data.sessionInformation);
          if (data.sessionInformation) {
            if (data.sessionInformation.cardDeck === DECKS.POWER_OF_TWO.values) {
              setCardDeckParam([
                { val: 1, image: '/card-decks/number-1.svg', id: 'number-1' },
                { val: 2, image: '/card-decks/number-2.svg', id: 'number-2' },
                { val: 4, image: '/card-decks/number-4.svg', id: 'number-4' },
                { val: 8, image: '/card-decks/number-8.svg', id: 'number-8' },
                { val: 16, image: '/card-decks/number-16.svg', id: 'number-16' },
                { val: 32, image: '/card-decks/number-32.svg', id: 'number-32' },
                { val: 64, image: '/card-decks/number-64.svg', id: 'number-64' },
                { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
                { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
                { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
              ]);
            }
            if (data.sessionInformation.cardDeck === DECKS.FIBBONACI.values) {
              setCardDeckParam([
                { val: 1, image: '/card-decks/number-1.svg', id: 'number-1' },
                { val: 2, image: '/card-decks/number-2.svg', id: 'number-2' },
                { val: 3, image: '/card-decks/number-3.svg', id: 'number-3' },
                { val: 5, image: '/card-decks/number-5.svg', id: 'number-5' },
                { val: 8, image: '/card-decks/number-8.svg', id: 'number-8' },
                { val: 13, image: '/card-decks/number-13.svg', id: 'number-13' },
                { val: 21, image: '/card-decks/number-21.svg', id: 'number-21' },
                { val: 34, image: '/card-decks/number-34.svg', id: 'number-34' },
                { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
                { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
                { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
              ]);
            }
            if (data.sessionInformation.cardDeck === DECKS.TSHIRT.values) {
              setCardDeckParam([
                { val: 1, image: '/card-decks/size-xs.svg', id: 'ize-xs' },
                { val: 2, image: '/card-decks/size-s.svg', id: 'size-s' },
                { val: 3, image: '/card-decks/size-m.svg', id: 'size-m' },
                { val: 4, image: '/card-decks/size-l.svg', id: 'size-l' },
                { val: 5, image: '/card-decks/size-xl.svg', id: 'size-xl' },
                { val: 100, image: '/card-decks/question-mark.svg', id: 'question-mark' },
                { val: 101, image: '/card-decks/infinity.svg', id: 'infinity' },
                { val: 102, image: '/card-decks/coffee.svg', id: 'coffee' },
              ]);
            }
          }
          // TODO - handle error , sessionInformation not present
        }
      });
  } catch (e) {
    // console.error(e);
  }
}

export default function Cards() {
  const userDetails = useAuthState();
  const { roomId } = useParams();
  const [cardDeck, setCardDeck] = useState([]);
  const [sessionInformation, setSessionInformation] = useState({});
  const { socketEvents, messages, setStory, story } = useSocket(roomId);

  useEffect(() => {
    getSessionInformation(setCardDeck, roomId, setSessionInformation);
  }, [setCardDeck, roomId]);

  // useEffect(() => {
  //   // TODO get this from context
  //   const { email, fullName } = userDetails.user;
  //   const { joinToRoom, disconnectSocket, onRoomMessages, sendMessageToRoom } = SocketEvents();
  //   // getPlanningSession(roomId);
  //   joinToRoom({ room: { id: roomId }, user: { fullName, email } });
  //   onRoomMessages((err, data) => {
  //     // eslint-disable-next-line
  //     console.log('client--onRoomMessages-cb', err, data);
  //     // if (err) return;
  //     // setRoom({ ...data.room });
  //     // setResponse(data.message);
  //   });
  //   // sendMessageToRoom({ id: roomId }, 'Welcome to room');

  //   return () => {
  //     disconnectSocket();
  //   };
  // }, [roomId, userDetails.user]);

  return (
    <Container>
      <br />
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
    </Container>
  );
}
