import React, { useState } from 'react';
import { Alert, Button, FormGroup, FormControl, FormLabel, Container, Form } from 'react-bootstrap';
import './Signup.css';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiConstants';
import PATHS from '../../constants/paths';

export default function Signup() {
  const history = useHistory();
  const location = useLocation();
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

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          password2: confirmPassword,
        }),
      };

      try {
        fetch(`${API_BASE_URL}/api/signup`, requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              history.push(redirectedFrom);
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
  }

  const isValidForm = validateForm();

  return (
    <Container className="Signup">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName">
          <FormLabel>First Name</FormLabel>
          <FormControl value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="lastName">
          <FormLabel>Last Name</FormLabel>
          <FormControl value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormGroup>

        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="password2">
          <FormLabel>Password2</FormLabel>
          <FormControl
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
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
          Sign up
        </Button>
        <p className="forgot-password text-right">
          Already registered
          <Link
            to={{
              pathname: PATHS.LOGIN,
              state: { redirectedFrom: { pathname: redirectedFrom } },
            }}
          >
            Sign In?
          </Link>
        </p>
      </Form>
    </Container>
  );
}
