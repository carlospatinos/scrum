import React, { useEffect, useState } from 'react';

import { Container, Table } from 'react-bootstrap';
import './SessionSummary.css';
import { API_CONSTANTS } from '../../constants';
import { CommonFunctions } from '../../util';
import { UserStoryAPI } from '../../api';

export default function SessionSummary() {
  const [userStoryArray, setUserStoryArray] = useState([]);
  const [numberOfUserStories, setNumberOfUserStories] = useState('');
  useEffect(() => {
    const roomId = CommonFunctions.getValueFromLocalStorage2(API_CONSTANTS.PLANNING_ROOM_ID);
    try {
      UserStoryAPI.get(roomId).then(planningSessionInformation => {
        setUserStoryArray(planningSessionInformation);
        setNumberOfUserStories(planningSessionInformation.length);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', MediaError);
    }
  }, []);

  return (
    <Container>
      <br />
      <p>Session Summary:</p>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Min Val</th>
            <th>Max Val</th>
            <th>Chosen value</th>
          </tr>
        </thead>
        {/* eslint-disable */}
        <tbody>
          {userStoryArray.map((userStory, i) => (
            <tr key={userStory._id}>
              <td>{i}</td>
              <td>{userStory.title}</td>
              <td>{userStory.chosenEstimatedValue}</td>
              <td>{userStory.minEstimatedValue}</td>
              <td>{userStory.maxEstimatedValue}</td>
            </tr>
          ))}
        </tbody>
        {/* eslint-enable */}
      </Table>

      <p>
        Deviation of estimation in general, Most accurate user, Fastest users response, session
        duration
      </p>

      <br />
      <p>Delete session?</p>
    </Container>
  );
}
