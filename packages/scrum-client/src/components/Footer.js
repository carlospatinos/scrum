import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ToastWrapper from './ToastWrapper/ToastWrapper';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center">
          <Col md={12} className="py-5">
            <div className="mb-5 flex-center" />
          </Col>
          <Col md={12}>
            <small className="d-block mb-3 text-muted">© 2020 Copyright: kinnetik-mx.com</small>
          </Col>
        </Row>
        <ToastWrapper />
      </Container>
    </footer>
  );
};

export default Footer;
