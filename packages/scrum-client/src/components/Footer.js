import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center">
          <Col md={12} className="py-1">
            <div className="mb-1 flex-center" />
          </Col>
          <Col md={12}>
            <small className="d-block mb-3 text-muted">© 2020 Copyright: kinnetik-mx.com</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
