import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  FormControl,
  Col,
  Row,
  Jumbotron,
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
      <Row>
        <Col className="col-md-6 mx-auto">
          <Jumbotron className="mt-3 shadow-lg p-3 mb-5 bg-white rounded">
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center">{t('Login.lblSignIn')}</h1>
              {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
              <FormGroup controlId="email">
                <FormControl
                  autoFocus
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('Login.phrEmail')}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <Form.Row>
                  <Col className="forgot-password text-right">
                    <Link
                      to={{
                        pathname: PATHS.FORGOT,
                        state: { redirectedFrom: { pathname: redirectedFrom } },
                      }}
                    >
                      <small>{t('Login.lblForgotPassword')}</small>
                    </Link>
                  </Col>
                </Form.Row>
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder={t('Login.phrPassword')}
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
              <Form.Row>
                <Col className="forgot-password text-right">
                  <Link
                    to={{
                      pathname: PATHS.SIGNUP,
                      state: { redirectedFrom: { pathname: redirectedFrom } },
                    }}
                  >
                    <small>
                      {t('Login.lblDonthaveaccount')} {t('Login.lnkSignup')}
                    </small>
                  </Link>
                </Col>
              </Form.Row>
              <br />

              <div className="separator"> {t('Login.lblOr')} </div>
              <br />
              <Button
                type="button"
                className="loginBtn loginBtn--google btn-block"
                onClick={() => {
                  goToExternalURL('google');
                }}
              >
                {t('Login.btnLoginWithGoogle')}
              </Button>
              <Button
                type="button"
                className="loginBtn loginBtn--twitter btn-block"
                onClick={() => {
                  goToExternalURL('twitter');
                }}
              >
                {t('Login.btnLoginWithTwitter')}
              </Button>
              <Button
                type="button"
                className="loginBtn loginBtn--facebook btn-block"
                onClick={() => {
                  goToExternalURL('facebook');
                }}
              >
                {t('Login.btnLoginWithFacebook')}
              </Button>
              <br />
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
