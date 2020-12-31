import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const TIMEOUT = 20000;

const ToastWrapper = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function displayTip() {
      setShow(true);
      setTimeout(displayTip, TIMEOUT);
    }
    displayTip();
  }, []);
  return (
    <>
      <Toast
        style={{ position: 'absolute', top: '0', right: '0' }}
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, youre reading this text in a Toast!</Toast.Body>
      </Toast>
    </>
  );
};
export default ToastWrapper;
