import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

import FormField from './FormField';

const PasswordField = props => {
  let { minStrength = 3, thresholdLength = 7 } = props;

  // set default minStrength to 3 if not a number or not specified
  // minStrength must be a a number between 0 - 4
  minStrength = typeof minStrength === 'number' ? Math.max(Math.min(minStrength, 4), 0) : 3;
  // set default thresholdLength to 7 if not a number or not specified
  // thresholdLength must be a minimum value of 7
  thresholdLength = typeof thresholdLength === 'number' ? Math.max(thresholdLength, 7) : 7;
  // initialize internal component state
  const [passwordStrenght, setPasswordStrenght] = useState({ password: '', strength: 0 });

  const stateChanged = state => {
    // update the internal state using the updated state from the form field
    setPasswordStrenght(
      {
        password: state.value,
        strength: zxcvbn(state.value).score,
      },
      () => props.onStateChanged(state)
    );
  };

  const validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= thresholdLength) throw new Error('Password is short');

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < minStrength) throw new Error('Password is weak');
  };

  const { type, validator, onStateChanged, children, ...restProps } = props;
  const { password, strength } = passwordStrenght;

  const passwordLength = password.length;
  const passwordStrong = strength >= minStrength;
  const passwordLong = passwordLength > thresholdLength;

  function badgeForPassword() {
    const badgeForStrongPassword = passwordStrong ? 'badge-success' : 'badge-warning';
    return passwordLong ? badgeForStrongPassword : 'badge-danger';
  }

  function lengthForPassword() {
    const maxPasswordLength = passwordLong ? `${thresholdLength}+` : passwordLength;
    return passwordLength ? maxPasswordLength : '';
  }
  // dynamically set the password length counter class
  const counterClass = ['badge badge-pill', badgeForPassword()].join(' ').trim();

  // password strength meter is only visible when password is not empty
  const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible']
    .join(' ')
    .trim();

  return (
    <>
      <div className="position-relative">
        {/** Pass the validation and stateChanged functions as props to the form field * */}
        <FormField
          type="password"
          validator={validatePasswordStrong}
          onStateChanged={stateChanged}
          {...restProps}
        >
          <span className="d-block form-hint">
            To conform with our Strong Password policy, you are required to use a sufficiently
            strong password. Password must be more than 7 characters.
          </span>
          {children}
          {/** Render the password strength meter * */}
          <div className={strengthClass}>
            <div className="strength-meter-fill" data-strength={strength} />
          </div>
        </FormField>
        <div className="position-absolute password-count mx-3">
          {/** Render the password length counter indicator * */}
          <span className={counterClass}>{lengthForPassword}</span>
        </div>
      </div>
    </>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number,
};

PasswordField.defaultProps = {
  required: PropTypes.bool,
  children: PropTypes.node,
  onStateChanged: PropTypes.func,
  minStrength: PropTypes.number,
  thresholdLength: PropTypes.number,
};

export default PasswordField;
