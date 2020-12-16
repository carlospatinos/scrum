/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import './VotingCards.css';

export default function Cards() {
  const [cardActive, setCardActive] = useState({ c1: false, c2: false, c3: false });

  const handleSpecificCardToggle = event => {
    console.log(event.target.id);
    setCardActive({ c1: true, c2: false, c3: true });
    // eslint-disable-next-line
    const a = cardActive.c1;
  };

  const handleSpecificCardToggleKeyboard = () => {
    // console.log(card);
  };
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    d3.selectAll('p').style('color', 'blue');
  });

  return (
    <Container>
      <br />
      <br />
      <div className="header">
        <h1>Responsive Image Grid</h1>
        <p>Resize the browser window to see the responsive effect.</p>
      </div>
      <div className="row">
        <div className="column">
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={0}
            onKeyDown={handleSpecificCardToggleKeyboard}
          >
            <img src="card-decks/number-1.svg" alt="Card" width="100" />
          </div>

          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={-1}
            onKeyDown={handleSpecificCardToggleKeyboard}
          >
            <img src="card-decks/number-2.svg" alt="Card" width="100" id="two" />
          </div>
        </div>
        <div className="column">
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={-1}
            onKeyDown={handleSpecificCardToggleKeyboard}
          >
            <img src="card-decks/number-3.svg" alt="Card" width="100" id="three" />
          </div>
          <div
            onClick={handleSpecificCardToggle}
            role="button"
            tabIndex={-1}
            onKeyDown={handleSpecificCardToggleKeyboard}
          >
            <img src="card-decks/number-4.svg" alt="Card" width="100" id="three" />
          </div>
        </div>
        <div className="column">
          <img src="card-decks/number-5.svg" alt="Card" width="100" />
          <img src="card-decks/number-8.svg" alt="Card" width="100" />
        </div>
      </div>

      <br />
      <br />
    </Container>
  );
}
