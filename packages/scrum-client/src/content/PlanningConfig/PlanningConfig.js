import React, { useState } from 'react';
import { Alert, Button, FormGroup, FormControl, FormLabel, Container, Form } from 'react-bootstrap';
import './PlanningConfig.css';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function Signup() {
  const [cardDeck, setCardDeck] = useState('');
  const [secure, setSecure] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  function validateForm() {
    return cardDeck.length > 0 && secure.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardDeck,
        secure,
      }),
    };

    try {
      fetch(`${API_BASE_URL}/api/signup`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // eslint-disable-next-line
            console.log('succeed');
          } else {
            setApiResponse(data.message);
          }
        });
    } catch (e) {
      // console.error(`=====> error:${e}`);
      setErrorMessage({ error: e });
      // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
    }
  }

  const isValidForm = validateForm();

  return (
    <Container className="Signup">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="cardDeck">
          <FormLabel>Card Deck</FormLabel>
          <FormControl value={cardDeck} onChange={e => setCardDeck(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="secure">
          <FormLabel>Secure</FormLabel>
          <FormControl value={secure} onChange={e => setSecure(e.target.value)} />
        </FormGroup>

        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          block
          disabled={!validateForm()}
          type="submit"
          variant={isValidForm ? 'primary' : 'secondary'}
        >
          Start Session
        </Button>
      </Form>
    </Container>
  );
}
