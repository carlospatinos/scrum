import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Container>
      <Row className="text-center">
        <Col md={12} className="py-5">
          <div className="mb-5 flex-center" />
        </Col>
        <Col md={12}>
          <img
            src="https://icon-asset.com/wp-content/uploads/facebook-transparent-png-white-and-facebook-logo-red-transparent-fb-icon-white-png-clipart.png"
            alt=""
            width="24"
            height="24"
            className="mb-2"
          />
          <small className="d-block mb-3 text-muted">© 2020 Copyright: Carlos.com</small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
