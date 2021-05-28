import React, { useEffect, useState } from 'react';

import { Alert, Container, Form } from 'react-bootstrap';
import './SessionSummary.css';
import { API_CONSTANTS } from '../../constants';
import { CommonFunctions } from '../../util';
import { UserStoryAPI } from '../../api';

export default function SessionSummary() {
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [numberOfUserStories, setNumberOfUserStories] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const roomId = CommonFunctions.getValueFromLocalStorage(API_CONSTANTS.PLANNING_ROOM_ID);

    try {
      UserStoryAPI.get(roomId).then(val => {
        console.log(val);
      });
    } catch (error) {
      console.log('error', MediaError);
    }
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <p>Session Summary:</p>
        <p>Total number of user stories</p>
        <p>Deviation of estimation in general</p>
        <p>Fastest user`s response</p>
        <p>Most accurate user</p>
        <br />
        <p>Delete session?</p>
        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>
    </Container>
  );
}
