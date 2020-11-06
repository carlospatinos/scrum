import React, { useState, Fragment } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormField = props => {
  const [state, setState] = useState({ value: '', dirty: false, errors: [] });

  function hasChanged(event) {
    event.preventDefault();

    // destructure props - assign default dummy functions to validator and onStateChanged props
    const { label, required = false, validator = f => f, onStateChanged = f => f } = props;

    const { value } = event.target;
    const isEmpty = value.length === 0;
    const requiredMissing = state.dirty && required && isEmpty;

    let errors = [];

    if (requiredMissing) {
      // if required and is empty, add required error to state
      errors = [...errors, `${label} is required`];
    } else if (typeof validator === 'function') {
      try {
        validator(value);
      } catch (e) {
        // if validator throws error, add validation error to state
        errors = [...errors, e.message];
      }
    }

    // update state and call the onStateChanged callback fn after the update
    // dirty is only changed to true and remains true on and after the first state update
    setState(
      ({ dirty = false }) => ({ value, errors, dirty: !dirty || dirty }),
      () => onStateChanged(state)
    );
  }

  const { value, dirty, errors } = state;
  const { type, label, fieldId, placeholder, children } = props;

  const hasErrors = errors.length > 0;
  const isInvalid = hasErrors ? 'is-invalid' : 'is-valid';
  const controlClass = ['form-control', dirty ? isInvalid : ''].join(' ').trim();

  return (
    <>
      <FormGroup className="form-group px-3 pb-2">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <FormLabel htmlFor={fieldId} className="control-label">
            {label}
          </FormLabel>

          {/** Render the first error if there are any errors * */}
          {hasErrors && (
            <div className="error form-hint font-weight-bold text-right m-0 mb-2">{errors[0]}</div>
          )}
        </div>
        {/** Render the children nodes passed to component * */}
        {children}
        <FormControl
          type={type}
          className={controlClass}
          id={fieldId}
          placeholder={placeholder}
          value={value}
          onChange={hasChanged}
        />
      </FormGroup>
    </>
  );
};

FormField.propTypes = {
  type: PropTypes.oneOf(['text', 'password']).isRequired,
  label: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func,
};

FormField.defaultProps = {
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func,
};

export default FormField;
