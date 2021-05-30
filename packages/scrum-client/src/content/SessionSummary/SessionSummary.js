import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './SessionSummary.css';
import { API_CONSTANTS } from '../../constants';
import { CommonFunctions } from '../../util';
import { UserStoryAPI } from '../../api';

export default function SessionSummary() {
  const { roomId } = useParams();
  const { t } = useTranslation();
  const [userStoryArray, setUserStoryArray] = useState([]);
  useEffect(() => {
    try {
      let roomIdFromURLOrLocalStorage = roomId;
      if (!roomIdFromURLOrLocalStorage || roomId === ':roomId') {
        roomIdFromURLOrLocalStorage = CommonFunctions.getValueFromLocalStorage2(
          API_CONSTANTS.PLANNING_ROOM_ID
        );
      }
      UserStoryAPI.get(roomIdFromURLOrLocalStorage).then(planningSessionInformation => {
        setUserStoryArray(planningSessionInformation);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', MediaError);
    }
  }, [roomId]);

  const handleDeleteSession = () => {
    // eslint-disable-next-line no-console
    console.log('Too late');
  };
  return (
    <Container>
      <br />
      <p>Session Summary: Titulo? Fecha? Tiempo de la sessionn? Numero de participantes?</p>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('SessionSummary.lblTableColNumber')}</th>
            <th>{t('SessionSummary.lblTableColTitle')}</th>
            <th>{t('SessionSummary.lblTableColMin')}</th>
            <th>{t('SessionSummary.lblTableColMax')}</th>
            <th>{t('SessionSummary.lblTableColChosen')}</th>
          </tr>
        </thead>
        {/* eslint-disable */}
        <tbody>
          {userStoryArray !== undefined && userStoryArray.length > 0  ? userStoryArray.map((userStory, i) => (
            <tr key={userStory._id}>
              <td>{i}</td>
              <td>{userStory.title}</td>
              <td>{userStory.chosenEstimatedValue}</td>
              <td>{userStory.minEstimatedValue}</td>
              <td>{userStory.maxEstimatedValue}</td>
            </tr>
          )) : <tr></tr>}
        </tbody>
        {/* eslint-enable */}
      </Table>

      <p>
        Deviation of estimation in general, Most accurate user, Fastest users response, session
        duration
      </p>

      <br />
      <p>
        <Button variant="danger" onClick={handleDeleteSession}>
          {t('SessionSummary.btnDeleteSession')}
        </Button>
      </p>
    </Container>
  );
}
