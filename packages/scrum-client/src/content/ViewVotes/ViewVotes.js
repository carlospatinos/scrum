import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { Container } from 'react-bootstrap';
import './ViewVotes.css';

export default function Cards() {
  const [isActive, setActive] = useState('false');
  const [isActive2, setActive2] = useState('false');

  const [cardActive, setCardActive] = useState({ c1: false, c2: false, c3: false });

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleToggle2 = () => {
    setActive2(!isActive2);
  };

  const handleSpecificCardToggle = event => {
    // eslint-disable-next-line
    console.log(event.target.id);
    setCardActive({ c1: true, c2: false, c3: true });
    // eslint-disable-next-line
    const a = cardActive.c1;
  };

  const handleSpecificCardToggleKeyboard = () => {
    // console.log(card);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    d3.selectAll('p').style('color', 'blue');
    document.getElementById('ax').style.color = 'red';
  });

  return (
    <Container className="Cards">
      <br />
      <br />
      <button type="button" onClick={handleToggle}>
        Press 1
      </button>
      <button type="button" onClick={handleToggle2}>
        Press 2
      </button>
      <div
        className={isActive ? 'f1_container active' : 'f1_container'}
        onClick={handleSpecificCardToggle}
        role="button"
        tabIndex={0}
        onKeyDown={handleSpecificCardToggleKeyboard}
      >
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-1.svg" alt="Card" width="200" />
          </div>
          <img
            src="card-decks/back.svg"
            className="back face center"
            alt="Card"
            width="200"
            id="one"
          />
        </div>
      </div>
      <div
        className={isActive2 ? 'f1_container active' : 'f1_container'}
        onClick={handleSpecificCardToggle}
        role="button"
        tabIndex={-1}
        onKeyDown={handleSpecificCardToggleKeyboard}
      >
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-2.svg" alt="Card" width="200" />
          </div>
          <img
            src="card-decks/back.svg"
            className="back face center"
            alt="Card"
            width="200"
            id="two"
          />
        </div>
      </div>
      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="card-decks/number-3.svg" alt="Card" width="200" />
          </div>
          <img src="card-decks/back.svg" className="back face center" alt="Card" width="200" />
        </div>
      </div>

      <br />
      <br />
      <p id="ax">Welcome test</p>
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
