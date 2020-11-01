import React, { useState } from "react";
import { Alert, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Signup.css";
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiConstants';

// import TagManager from 'react-gtm-module'
// if (process.env.NODE_ENV === "development" && !!process.env.REACT_APP_GTM_ID) {
//   document.title = "signup";
//   console.log(document.title);
//   const tagManagerArgs = {
//     dataLayer: {
//       page: "signup", //Specific to each page
//       pagePath: window.location.pathname + window.location.search, //"/signup", //Specific to each page
//       title: "signup"
//     },
//     dataLayerName: "PageDataLayer"
//   };
//   TagManager.dataLayer(tagManagerArgs);
// }

export default function Signup() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const [apiResponse] = useState('');

  function validateForm() {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password === password2
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        password2,
      }),
    };

    try {
      fetch(API_BASE_URL + "/api/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            history.push("/home");
          } else {
            setApiResponse(data.message);
          }
        });
    } catch (e) {
      console.log("=====> error:" + e);
      setErrorMessage({ error: e });
      // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
    }
  }

  const isValidForm = validateForm();

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
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
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            type="password"
          />
        </FormGroup>
        {apiResponse && <Alert variant={"danger"}>{apiResponse}</Alert>}
        {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
        <Button block disabled={!validateForm()} type="submit" variant={isValidForm ? "primary" : "secondary"}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
