import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const DELAY = 5000;
// TODO make toasts stacked
const ToastWrapper = props => {
  const [show, setShow] = useState(false);
  const { message, timeOut } = props;

  useEffect(() => {
    function displayTip() {
      setShow(true);
    }
    setTimeout(displayTip, timeOut);
  }, [timeOut]);
  return (
    <>
      <Toast
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClose={() => setShow(false)}
        show={show}
        delay={DELAY}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">{message.title} </strong>
          <small> now</small>
        </Toast.Header>
        <Toast.Body>{message.description}!</Toast.Body>
      </Toast>
    </>
  );
};
export default ToastWrapper;
