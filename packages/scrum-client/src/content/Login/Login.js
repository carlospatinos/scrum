import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

import ReactGA from 'react-ga';

if(process.env.NODE_ENV === "production") {
  ReactGA.pageview(window.location.pathname + window.location.search);
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    console.log("======> " + process.env.REACT_APP_API_URL + "/api");
    event.preventDefault();
    try {
      fetch(process.env.REACT_APP_API_URL + "/api")
        .then((response) => response.json())
        //.then(response => response.text())
        .then((data) => {
          console.log('This is your data2', data.message);
          setApiResponse(data.message);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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
        <FormGroup>
          <FormLabel>{apiResponse}</FormLabel>
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}