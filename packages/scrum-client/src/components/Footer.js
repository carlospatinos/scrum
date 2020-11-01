import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer className="footer">
    <Container>
        <Row className="text-center">
          <Col md={12} className="py-5">
            <div className="mb-5 flex-center">
            </div>
          </Col>
          <Col md={12}>
            <small className="d-block mb-3 text-muted">
              © 2020 Copyright: kinnetik-mx.com
            </small>
          </Col>
        </Row>
    </Container>
  </footer>
);

export default Footer;
