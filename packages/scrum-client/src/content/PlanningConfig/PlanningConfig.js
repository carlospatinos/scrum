import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
  Form,
  FormCheck,
} from 'react-bootstrap';
import './PlanningConfig.css';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function Signup() {
  const [title, setTitle] = useState('');
  const [cardDeck] = useState(''); // value={cardDeck} onChange={e => setCardDeck(e.target.value)}
  const [secure, setSecure] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const cardDeckOptions = [
    { key: 1, name: 'power of two', values: '0, 1, 2, 4, 8, 16, 32, 64, ?, I, C' },
    { key: 2, name: 'fibbonaci', values: '0,1, 2, 3, 5, 8, 13, 21, 34, ?, I, C' },
    { key: 3, name: 't-shirt sizing', values: 'xs, s, m, l, xl, ?, I, C' },
    { key: 4, name: 'custom', values: '...' },
  ];

  useEffect(() => {
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const date1 = new Date(2012, 5, 10);
    const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1);

    setTitle(`Planning ${dateTimeFormat2.format(date1)}`);
  }, []);

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
        <FormGroup controlId="planningTitle">
          <FormLabel>Planning title</FormLabel>
          <FormControl value={title} onChange={e => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="cardDeck">
          <FormLabel>Card Deck</FormLabel>
          <FormControl as="select">
            {cardDeckOptions.map(({ key, name, values }) => (
              <option value={name} key={key}>
                {name} - {values}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="secure">
          <FormCheck type="checkbox" label="Secure" onChange={e => setSecure(e.target.value)} />
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
