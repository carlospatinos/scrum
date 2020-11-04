import React, { useState } from 'react';

import FormField from './FormField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';

const JoinForm = () => {
  // initialize state to hold validity of form fields
  const [state, setState] = useState({ fullname: false, email: false, password: false });

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  const fieldStateChanged = field => intState =>
    setState({ [field]: intState.errors.length === 0 });

  // state change watch functions for each field
  const emailChanged = fieldStateChanged('email');
  const fullnameChanged = fieldStateChanged('fullname');
  const passwordChanged = fieldStateChanged('password');

  const { fullname, email, password } = state;

  function validateForm() {
    return fullname.length > 0 && email.length > 0 && password.length > 0;
  }
  const isValidForm = validateForm();

  // validation function for the fullname
  // ensures that fullname contains at least two names separated with a space
  const validateFullname = value => {
    const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
    if (!regex.test(value)) throw new Error('Fullname is invalid');
  };

  return (
    <div className="form-container d-table-cell position-relative align-middle">
      <form action="/" method="POST" noValidate>
        <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
          <legend className="form-label mb-0">Welcome</legend>
        </div>

        <div className="py-5 border-gray border-top border-bottom">
          {/** Render the fullname form field passing the name validation fn * */}
          <FormField
            type="text"
            fieldId="fullname"
            label="Full Name"
            placeholder="Enter Full Name"
            validator={validateFullname}
            onStateChanged={fullnameChanged}
            required
          />

          {/** Render the email field component * */}
          <EmailField
            fieldId="email"
            label="Email"
            placeholder="Enter Email Address"
            onStateChanged={emailChanged}
            required
          />

          {/** Render the password field component using thresholdLength of 7 and minStrength of 3 * */}
          <PasswordField
            fieldId="password"
            label="Password"
            placeholder="Enter Password"
            onStateChanged={passwordChanged}
            thresholdLength={7}
            minStrength={3}
            required
          />

          <button
            type="button"
            className="btn btn-primary text-uppercase px-3 py-2"
            disabled={!isValidForm}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
