import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Col,
} from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PATHS from '../../constants/paths';
import { useAppContext } from '../../lib/contextLib';

import { API_BASE_URL, ACCESS_TOKEN_NAME, USER } from '../../constants/apiConstants';
import './Login.css';

const validateForm = (email, password) => email.length > 0 && password.length > 0;

export default function Login() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const { userHasAuthenticated } = useAppContext();
  const redirectedFrom = location.state?.redirectedFrom?.pathname || PATHS.HOME;

  function goToExternalURL(type) {
    let redirection;
    if (type === 'google') {
      redirection = process.env.REACT_APP_API_URL + PATHS.GOOGLE_LOGIN;
    } else if (type === 'facebook') {
      redirection = process.env.REACT_APP_API_URL + PATHS.FACEBOOK_LOGIN;
    } else if (type === 'twitter') {
      redirection = process.env.REACT_APP_API_URL + PATHS.TWITTER_LOGIN;
    }
    // eslint-disable-next-line
    console.log('redirecting to:', redirection);
    window.location = redirection;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    try {
      fetch(`${API_BASE_URL}${PATHS.AUTH_LOCAL}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.isAuth) {
            localStorage.setItem(ACCESS_TOKEN_NAME, data.ACCESS_TOKEN);
            localStorage.setItem(USER.FULL_NAME, data.fullName);
            localStorage.setItem(USER.EMAIL, data.email);
            userHasAuthenticated(true);
            history.push({
              pathname: redirectedFrom,
            });
          } else {
            setApiResponse(data.message);
          }
        });
    } catch (e) {
      // console.error(e);
    }
  }
  const isValidForm = validateForm(email, password);

  return (
    <Container className="Login">
      <Form onSubmit={handleSubmit}>
        <h3>{t('signIn')}</h3>
        <Form.Row>
          <Col className="text-right">
            {t('donthaveaccount')}
            <Link
              to={{
                pathname: PATHS.SIGNUP,
                state: { redirectedFrom: { pathname: redirectedFrom } },
              }}
            >
              {t('signup')}
            </Link>
          </Col>
        </Form.Row>
        <FormGroup controlId="email">
          <FormLabel>{t('email')}</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>{t('password')}</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        <Button
          block
          disabled={!isValidForm}
          variant={isValidForm ? 'primary' : 'secondary'}
          type="submit"
        >
          {t('login')}
        </Button>

        <p className="forgot-password text-right">
          <a href={PATHS.FORGOT}>{t('forgotPassword')}</a>
        </p>

        <div className="separator"> {t('or')} </div>
        <br />
        <button
          type="button"
          className="loginBtn loginBtn--google btn-block"
          onClick={() => {
            goToExternalURL('google');
          }}
        >
          {t('loginWithGoogle')}
        </button>
        <br />
        <button
          type="button"
          className="loginBtn loginBtn--twitter btn-block"
          onClick={() => {
            goToExternalURL('twitter');
          }}
        >
          {t('loginWithTwitter')}
        </button>
        <br />
        <button
          type="button"
          className="loginBtn loginBtn--facebook btn-block"
          onClick={() => {
            goToExternalURL('facebook');
          }}
        >
          {t('loginWithFacebook')}
        </button>
        <br />
      </Form>
    </Container>
  );
}
