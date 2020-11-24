import React from 'react';
import { Container } from 'react-bootstrap';
import './VotingCards.css';

export default function Cards() {
  return (
    <Container className="Signup">
      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="plain-card.svg" alt="Card" />
          </div>
          <img src="plain-card.svg" className="back face center" alt="Card" />
        </div>
      </div>

      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="plain-card.svg" alt="Card" />
          </div>
          <div className="back face center">Some text inside here</div>
        </div>
      </div>

      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="plain-card.svg" alt="Card" />
          </div>
          <div className="back face center">Some text inside here</div>
        </div>
      </div>

      <div className="f1_container">
        <div className="shadow f1_card">
          <div className="front face">
            <img src="plain-card.svg" alt="Card" />
          </div>
          <div className="back face center">Some text inside here</div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
