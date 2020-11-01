import React, { useState } from "react";
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

import "./Login.css";

// import TagManager from 'react-gtm-module'

// if (process.env.NODE_ENV === "development" && !!process.env.REACT_APP_GTM_ID) {
//   document.title = "login";
//   const tagManagerArgs = {
//     dataLayer: {
//       page: "login", //Specific to each page
//       pagePath: window.location.pathname + window.location.search, //"/login", //Specific to each page
//       title: "login"
//     },
//     dataLayerName: "PageDataLayer"
//   };
//   TagManager.dataLayer(tagManagerArgs);
// }

export default function Login() {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");
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
      fetch(API_BASE_URL + "/api/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.isAuth) {
           localStorage.setItem(ACCESS_TOKEN_NAME, data.token);
            history.push("/home");
          } else {
            setApiResponse(data.message);
          }
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
      </form>
    </div>
  );
}
