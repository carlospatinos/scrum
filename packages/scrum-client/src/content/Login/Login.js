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
import { END_POINTS } from 'scrum-common';
import { PATHS } from '../../constants';
import { loginUser, useAuthState, useAuthDispatch } from '../../context';

import './Login.css';

const validateForm = (email, password) => email.length > 0 && password.length > 0;

export default function Login() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const redirectedFrom = location.state?.redirectedFrom?.pathname || PATHS.HOME;

  function goToExternalURL(type) {
    let redirection;
    const authUrl = process.env.REACT_APP_API_URL + END_POINTS.AUTH;
    if (type === 'google') {
      redirection = authUrl + END_POINTS.GOOGLE_LOGIN;
    } else if (type === 'facebook') {
      redirection = authUrl + END_POINTS.FACEBOOK_LOGIN;
    } else if (type === 'twitter') {
      redirection = authUrl + END_POINTS.TWITTER_LOGIN;
    }
    // eslint-disable-next-line
    console.log('redirecting to:', redirection);
    window.location = redirection;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await loginUser(dispatch, { email, password });
      if (response && response.user === undefined) return;
      history.push(PATHS.HOME);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  const isValidForm = validateForm(email, password);

  return (
    <Container className="Login">
      <Form onSubmit={handleSubmit}>
        <h3>{t('Login.lblSignIn')}</h3>
        {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
        <Form.Row>
          <Col className="text-right">
            {t('Login.lblDonthaveaccount')}
            <Link
              to={{
                pathname: PATHS.SIGNUP,
                state: { redirectedFrom: { pathname: redirectedFrom } },
              }}
            >
              {t('Login.lnkSignup')}
            </Link>
          </Col>
        </Form.Row>
        <FormGroup controlId="email">
          <FormLabel>{t('Login.lblEmail')}</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>{t('Login.lblPassword')}</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button
          block
          disabled={!isValidForm || loading}
          variant={isValidForm ? 'primary' : 'secondary'}
          type="submit"
        >
          {t('Login.btnLogin')}
        </Button>

        <p className="forgot-password text-right">
          <a href={PATHS.FORGOT}>{t('Login.lblForgotPassword')}</a>
        </p>

        <div className="separator"> {t('Login.lblOr')} </div>
        <br />
        <button
          type="button"
          className="loginBtn loginBtn--google btn-block"
          onClick={() => {
            goToExternalURL('google');
          }}
        >
          {t('Login.btnLoginWithGoogle')}
        </button>
        <br />
        <button
          type="button"
          className="loginBtn loginBtn--twitter btn-block"
          onClick={() => {
            goToExternalURL('twitter');
          }}
        >
          {t('Login.btnLoginWithTwitter')}
        </button>
        <br />
        {/* <button
          type="button"
          className="loginBtn loginBtn--facebook btn-block"
          onClick={() => {
            goToExternalURL('facebook');
          }}
        >
          {t('Login.btnLoginWithFacebook')}
        </button> */}
        <br />
      </Form>
    </Container>
  );
}
