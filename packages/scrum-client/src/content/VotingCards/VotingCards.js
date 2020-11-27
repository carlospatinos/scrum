import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import './VotingCards.css';

export default function Cards() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    d3.selectAll('p').style('color', 'blue');
  });

  return (
    <Container className="Cards">
      <br />
      <br />

      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-1.svg" alt="Card" />
          </div>
          <img src="card-decks/back.svg" className="back face center" alt="Card" />
        </div>
      </div>
      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-2.svg" alt="Card" />
          </div>
          <img src="card-decks/back.svg" className="back face center" alt="Card" />
        </div>
      </div>
      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-3.svg" alt="Card" />
          </div>
          <img src="card-decks/back.svg" className="back face center" alt="Card" />
        </div>
      </div>

      <br />
      <br />
      <p>Welcome test</p>
      <div id="myDiv" />
      <div id="myDiv2" />
      <div>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
      <br />
    </Container>
  );
}
