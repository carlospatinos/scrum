import React, { useState } from 'react';
import { Alert, Button, Container, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '../../lib/contextLib';

import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Login.css';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const { userHasAuthenticated } = useAppContext();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    try {
      fetch(`${API_BASE_URL}/api/login`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.isAuth) {
            localStorage.setItem(ACCESS_TOKEN_NAME, data.token);
            userHasAuthenticated(true);
            history.push('/home');
          } else {
            setApiResponse(data.message);
          }
        });
    } catch (e) {
      // console.error(e);
    }
  }
  const isValidForm = validateForm();

  return (
    <Container className="Login">
      <Form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
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
        {apiResponse && <Alert variant="danger">{apiResponse}</Alert>}
        <Button
          block
          disabled={!isValidForm}
          variant={isValidForm ? 'primary' : 'secondary'}
          type="submit"
        >
          Login
        </Button>

        <p className="forgot-password text-right">
          Forgot <a href="/forgot">password?</a>
        </p>
      </Form>
    </Container>
  );
}
