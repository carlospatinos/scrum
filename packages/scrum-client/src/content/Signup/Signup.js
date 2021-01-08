import React, { useState } from 'react';
import { Alert, Button, FormGroup, FormControl, FormLabel, Container, Form } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import './Signup.css';
import { useTranslation } from 'react-i18next';
import { API_CONSTANTS, PATHS } from '../../constants';
import { Request } from '../../util';

const checkReferral = referrerValue => {
  return (
    referrerValue !== undefined &&
    referrerValue !== '' &&
    referrerValue !== ':referrer' &&
    referrerValue !== ':referrer?'
  );
};

export default function Signup() {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const { referrer } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [apiResponse, setApiResponse] = useState('');

  const redirectedFrom = location.state?.redirectedFrom?.pathname || PATHS.HOME;
  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    );
  }
  const isValidForm = validateForm();
  const isReferral = checkReferral(referrer);

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      try {
        const payload = {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          referredBy: referrer,
        };
        if (!isReferral) {
          delete payload.referredBy;
        }
        Request.post(`${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.SIGN_UP}`, payload)
          .then(data => {
            if (data.success) {
              history.push(redirectedFrom);
            } else {
              setApiResponse(data.message);
            }
          })
          .catch(e => {
            setApiResponse(e.message);
          });
      } catch (e) {
        // console.error(`=====> error:${e}`);
        setErrorMessage({ error: e });
        // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
      }
    }
  }

  return (
    <Container className="Signup">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName">
          <FormLabel>{t('Signup.lblFirstName')}</FormLabel>
          <FormControl value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="lastName">
          <FormLabel>{t('Signup.lblLastName')}</FormLabel>
          <FormControl value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>{t('Signup.lblEmail')}</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>{t('Signup.lblPassword')}</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>{t('Signup.lblPassword2')}</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {isReferral && (
          <FormGroup controlId="referredBy">
            <FormLabel>{t('Signup.lblReferredBy')}</FormLabel>
            <FormControl value={referrer} type="text" readOnly />
          </FormGroup>
        )}

        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button
          block
          disabled={!validateForm()}
          type="submit"
          variant={isValidForm ? 'primary' : 'secondary'}
        >
          {t('Signup.btnSignup')}
        </Button>
        <p className="forgot-password text-right">
          {t('Signup.lblAlreadyRegistered')}
          <Link
            to={{
              pathname: PATHS.LOGIN,
              state: { redirectedFrom: { pathname: redirectedFrom } },
            }}
          >
            {t('Signup.lnkSignIn')}
          </Link>
        </p>
      </Form>
    </Container>
  );
}
