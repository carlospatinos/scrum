/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import ClickableCard from '../../components/ClickableCard';
import GridGenerator from '../../components/GridGenerator';

import './VotingCards.css';

export default function Cards() {
  const { roomId } = useParams();
  const [cardDeck, setCardDeck] = useState([{ val: 1, image: '/card-decks/number-1.svg' }]);
  const [sessionInformation, setSessionInformation] = useState({});

  function getSessionInformation(setCardDeckParam, roomIdParam) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      fetch(`${API_BASE_URL}/api/planningsession/${roomIdParam}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.success) {
            setSessionInformation(data.sessionInformation);
            if (
              data &&
              data.sessionInformation &&
              data.sessionInformation.cardDeck === '0, 1, 2, 4, 8, 16, 32, 64, ?, I, C'
            ) {
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
            if (
              data &&
              data.sessionInformation &&
              data.sessionInformation.cardDeck === '0, 1, 2, 3, 5, 8, 13, 21, 34, ?, I, C'
            ) {
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
            if (
              data &&
              data.sessionInformation &&
              data.sessionInformation.cardDeck === 'xs, s, m, l, xl, ?, I, C'
            ) {
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
        });
    } catch (e) {
      // console.error(e);
    }
  }

  useEffect(() => {
    getSessionInformation(setCardDeck, roomId);
  }, [setCardDeck, roomId]);

  const handleSpecificCardToggle = event => {
    // eslint-disable-next-line
    console.log(event.target.id);
  };

  const handleSpecificCardToggleKeyboard = event => {
    // eslint-disable-next-line
    console.log(event.target.id);
  };

  return (
    <Container>
      <br />
      <h4>{sessionInformation ? sessionInformation.title : ''}</h4>
      Room: {roomId}
      <br />
      Card Deck: {sessionInformation ? sessionInformation.cardDeck : ''}
      <br />
      Current User story: &lt;Provided by Admin&gt;
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
