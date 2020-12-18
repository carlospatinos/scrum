/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { API_BASE_URL } from '../../constants/apiConstants';

import './VotingCards.css';

export default function Cards() {
  const { id: roomId } = useParams();
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
          console.log(data.sessionInformation.title);
          setSessionInformation(data.sessionInformation);
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

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    d3.selectAll('p').style('color', 'blue');
  });

  return (
    <Container>
      <br />
      Title: {sessionInformation.title}
      <br />
      Card Deck: {sessionInformation.cardDeck}
      <br />
      <Row>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-1.svg" alt="Card" width="100" id="one" />
          </div>
        </Col>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-2.svg" alt="Card" width="100" id="two" />
          </div>
        </Col>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-3.svg" alt="Card" width="100" id="three" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-4.svg" alt="Card" width="100" id="four" />
          </div>
        </Col>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-5.svg" alt="Card" width="100" id="five" />
          </div>
        </Col>
        <Col>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
            style={{ display: 'inline-block' }}
          >
            <img src="card-decks/number-8.svg" alt="Card" width="100" id="eight" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
