import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import "./Login.css";

import TagManager from "react-gtm-module";

if (process.env.NODE_ENV === "production" && !!process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    dataLayer: {
      page: "login", //Specific to each page
      pagePath: window.location.pathname + window.location.search, //"/login", //Specific to each page
      title: "login",
    },
    dataLayerName: "PageDataLayer",
  };
  TagManager.dataLayer(tagManagerArgs);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState();

  // useEffect(() => {
  //   // Update the document title using the browser API
  //document.title = `You clicked ${count} times`;
  // });

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    try {
      fetch(`${process.env.REACT_APP_API_URL}/api/login`, requestOptions) /// api
        .then(response => response.json())
        // .then(response => response.text())
        .then(data => {
          setApiResponse(data.message);
        });
    } catch (e) {
      // console.log(e);
    }
  }
  const isValidForm = validateForm();

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {apiResponse && <Alert variant={"danger"}>{apiResponse}</Alert>}
        <Button
          block
          disabled={!isValidForm}
          variant={isValidForm ? "primary" : "secondary"}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
