import React from 'react';
import { Container } from 'react-bootstrap';
import JoinForm from '../../components/JoinForm';

import './NewLogin.scss';

function NewLogin() {
  return (
    <Container className="main-container2 d-table m-auto">
      <JoinForm />
    </Container>
  );
}

export default NewLogin;
