import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import './ToastWrapper.css';

const TIMEOUT = 10000;
const DELAY = 5000;
// TODO make toasts stacked
const ToastWrapper = props => {
  const [show, setShow] = useState(false);
  const { message, timeOut } = props;

  useEffect(() => {
    function displayTip() {
      setShow(true);
    }
    setTimeout(displayTip, timeOut * TIMEOUT);
  }, [timeOut]);
  return (
    <>
      <Toast
        style={{ position: 'absolute', top: '20px', right: '20px' }}
        onClose={() => setShow(false)}
        show={show}
        delay={DELAY}
        autohide
      >
        <Toast.Header style={{ backgroundColor: '#d1d2d3', color: 'black' }}>
          <strong className="mr-auto">
            {message.title}
            {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'}
            {'\u00A0'}
          </strong>
          <small> now</small>
        </Toast.Header>
        <Toast.Body>{message.description}!</Toast.Body>
      </Toast>
    </>
  );
};
export default ToastWrapper;
