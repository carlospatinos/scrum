import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
  Col,
  Form,
  FormCheck,
} from 'react-bootstrap';
import './PlanningConfig.css';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import PATHS from '../../constants/paths';

import { API_BASE_URL, PLANNING_ROOM_ID } from '../../constants/apiConstants';

export default function PlanningConfig() {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [sampleValues, setSampleValues] = useState('');
  // const [userStoriesCreation] = useState('');
  const [cardDeck, setCardDeck] = useState('');
  const [allowUnauthenticated, setAllowUnauthenticated] = useState(false);
  const [userStoriesCreationMethod, setUserStoriesCreationMethod] = useState('manual');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const redirectedFrom = location.state?.redirectedFrom?.pathname || PATHS.SHARE_SESSION;

  const cardDeckOptions = [
    { key: 0, name: '-- select one --', values: '' },
    { key: 1, name: 'power of two', values: '0, 1, 2, 4, 8, 16, 32, 64, ?, I, C' },
    { key: 2, name: 'fibbonaci', values: '0, 1, 2, 3, 5, 8, 13, 21, 34, ?, I, C' },
    { key: 3, name: 't-shirt sizing', values: 'xs, s, m, l, xl, ?, I, C' },
  ];

  useEffect(() => {
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const currDate = new Date();
    const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options1);

    setTitle(`Planning ${dateTimeFormat2.format(currDate)}`);
  }, []);

  function validateForm() {
    return title.length > 0 && cardDeck.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        cardDeck,
        allowUnauthenticated,
        userStoriesCreationMethod,
      }),
    };

    try {
      fetch(`${API_BASE_URL}${PATHS.PLANNING_SESSION}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem(PLANNING_ROOM_ID, data.planningRoomId);
            history.push({
              pathname: redirectedFrom,
            });
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
          <FormLabel>{t('PlanningConfig.lblTitle')}</FormLabel>
          <FormControl value={title} onChange={e => setTitle(e.target.value)} name="title" />
        </FormGroup>
        <FormGroup controlId="cardDeck">
          <FormLabel>Card Deck</FormLabel>
          <FormControl
            as="select"
            name="cardDeck"
            onChange={e => {
              setCardDeck(e.target.value);
              setSampleValues(e.target.value);
            }}
          >
            {cardDeckOptions.map(({ key, name, values }) => (
              <option value={values} key={key}>
                {name}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup controlId="sampleValues">
          <FormLabel>{t('PlanningConfig.lblValues')} </FormLabel>
          <FormControl value={sampleValues} name="sampleValues" disabled />
        </FormGroup>
        <fieldset>
          <Form.Group>
            <Form.Label as="userStoriesCreationMethod" column>
              {t('PlanningConfig.lblCreationMethod')}
            </Form.Label>
            <Col onChange={e => setUserStoriesCreationMethod(e.target.value)}>
              <Form.Check
                type="radio"
                label="Manual"
                name="userStoriesCreationMethod"
                value="manual"
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Github"
                name="userStoriesCreationMethod"
                value="github"
              />
              <Form.Check
                type="radio"
                label="GitLab"
                name="userStoriesCreationMethod"
                value="gitlab"
              />
              <Form.Check type="radio" label="CSV" name="userStoriesCreationMethod" value="csv" />
            </Col>
          </Form.Group>
        </fieldset>
        <FormGroup controlId="allowUnauthenticated">
          <FormCheck
            type="checkbox"
            label={t('PlanningConfig.lblAllowUnauthenticated')}
            onChange={e => setAllowUnauthenticated(e.target.checked)}
            name="allowUnauthenticated"
          />
        </FormGroup>

        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          block
          disabled={!validateForm()}
          type="submit"
          variant={isValidForm ? 'primary' : 'secondary'}
        >
          {t('PlanningConfig.btnCreateSession')}
        </Button>
      </Form>
    </Container>
  );
}
