import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Signup.css";

import ReactGA from 'react-ga';

console.log(window.location.pathname + window.location.search);
if (process.env.NODE_ENV === "production") {
  ReactGA.pageview(window.location.pathname + window.location.search);
}


export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [apiResponse] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, password2: password2 })
    };

    try {
      fetch(process.env.REACT_APP_API_URL + "/api/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('This is your data', data);
          //setApiResponse(data.success);
        });
    } catch (e) {
      console.log("=====> error:" + e);
      setErrorMessage({error: e});
      // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
    }
  }

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName">
          <FormLabel>First Name</FormLabel>
          <FormControl
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastName">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
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
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{apiResponse}</FormLabel>
        </FormGroup>
        <FormGroup>
          <FormLabel>{errorMessage}</FormLabel>
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}