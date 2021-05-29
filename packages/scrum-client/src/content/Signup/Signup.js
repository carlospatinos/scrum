import React, { useState } from 'react';
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
  Form,
  Col,
  Jumbotron,
  Row,
} from 'react-bootstrap';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import './Signup.css';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../../constants';
import { AuthAPI } from '../../api';

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
        AuthAPI.signUp(payload)
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
      <Row>
        <Col xs={0} md={2} lg={4} className="mx-auto" />
        <Col xs={12} md={8} lg={4} className="mx-auto">
          <Jumbotron className="mt-3 shadow-lg p-3 mb-5 bg-white rounded ">
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center">{t('Signup.lblSignup')}</h1>
              <FormGroup controlId="firstName">
                <FormControl
                  autoFocus
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder={t('Signup.lblFirstName')}
                />
              </FormGroup>
              <FormGroup controlId="lastName">
                <FormControl
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder={t('Signup.lblLastName')}
                />
              </FormGroup>

              <FormGroup controlId="email">
                <FormControl
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('Signup.lblEmail')}
                />
              </FormGroup>
              <FormGroup controlId="password">
                <FormControl
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder={t('Signup.lblPassword')}
                />
              </FormGroup>
              <FormGroup controlId="confirmPassword">
                <FormControl
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder={t('Signup.lblPassword2')}
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
                <Link
                  to={{
                    pathname: PATHS.LOGIN,
                    state: { redirectedFrom: { pathname: redirectedFrom } },
                  }}
                >
                  <small>
                    {t('Signup.lblAlreadyRegistered')} {t('Signup.lnkSignIn')}
                  </small>
                </Link>
              </p>
            </Form>
          </Jumbotron>
        </Col>
        <Col xs={0} md={2} lg={4} className="mx-auto" />
      </Row>
    </Container>
  );
}
