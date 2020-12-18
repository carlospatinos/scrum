/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';
import ClickableCard from '../../components/ClickableCard';

import './VotingCards.css';

export default function Cards() {
  const { id: roomId } = useParams();
  const [cardDeck, setCardDeck] = useState([{ val: 1, image: 'card-decks/number-1.svg' }]);
  const [cardActive, setCardActive] = useState({ c1: false, c2: false, c3: false });
  const [sessionInformation, setSessionInformation] = useState({});

  function getSessionInformation() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      fetch(`${API_BASE_URL}/api/planningsession/5fdb9370d0aec94d8483ba95`, requestOptions)
        .then(response => response.json())
        .then(data => {
          setSessionInformation(data.sessionInformation);
          if (data.sessionInformation.cardDeck === 'power of two') {
            setCardDeck([
              { val: 1, image: 'card-decks/number-1.svg' },
              { val: 2, image: 'card-decks/number-2.svg' },
              { val: 3, image: 'card-decks/number-4.svg' },
              { val: 4, image: 'card-decks/number-8.svg' },
            ]);
          }
          if (data.sessionInformation.cardDeck === 'fibbonaci') {
            setCardDeck([
              { val: 1, image: 'card-decks/number-1.svg' },
              { val: 2, image: 'card-decks/number-2.svg' },
              { val: 3, image: 'card-decks/number-3.svg' },
              { val: 4, image: 'card-decks/number-5.svg' },
              { val: 5, image: 'card-decks/number-8.svg' },
            ]);
          }
          if (data.sessionInformation.cardDeck === 't-shirt sizing') {
            setCardDeck([
              { val: 1, image: 'card-decks/size-xs.svg' },
              { val: 2, image: 'card-decks/size-s.svg' },
              { val: 3, image: 'card-decks/size-m.svg' },
              { val: 4, image: 'card-decks/size-l.svg' },
              { val: 5, image: 'card-decks/size-xl.svg' },
            ]);
          }
        });
    } catch (e) {
      // console.error(e);
    }
  }

  useEffect(() => {
    getSessionInformation();
  }, []);

  const handleSpecificCardToggle = event => {
    console.log(event.target.id, roomId);
    setCardActive({ c1: true, c2: false, c3: true });
    // eslint-disable-next-line
    const a = cardActive.c1;
  };

  const handleSpecificCardToggleKeyboard = event => {
    console.log(event.target.id);
  };

  useEffect(() => {});

  return (
    <Container>
      <br />
      Title: {sessionInformation.title}
      <br />
      Card Deck: {sessionInformation.cardDeck}
      <br />
      <Row>
        <Col>1</Col>
        <Col>2</Col>
        <Col>3</Col>
      </Row>
      <Row>
        <Col>4</Col>
        <Col>5</Col>
        <Col>8</Col>
      </Row>
      <hr />
      {cardDeck.map(card => {
        return (
          <ClickableCard
            image={card.image}
            clickableFunction={handleSpecificCardToggle}
            keyboardFunction={handleSpecificCardToggleKeyboard}
          />
        );
      })}
    </Container>
  );
}
