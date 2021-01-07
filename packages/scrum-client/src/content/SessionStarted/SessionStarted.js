import React, { useState } from 'react';
import { Alert, Container, Form } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import './SessionStarted.css';
import { API_CONSTANTS } from '../../constants';
import { Request } from '../../util';

export default function SessionStarted() {
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    try {
      Request.post(`${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.SIGN_UP}`).then(
        data => {
          if (data.success) {
            // eslint-disable-next-line
            console.log('succeed');
          } else {
            setApiResponse(data.message);
          }
        }
      );
    } catch (e) {
      // console.error(`=====> error:${e}`);
      setErrorMessage({ error: e });
      // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <p>Users online</p>
        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>
    </Container>
  );
}
