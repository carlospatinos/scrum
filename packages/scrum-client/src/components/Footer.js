/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ToastWrapper from './ToastWrapper/ToastWrapper';
import { TipsAPI } from '../api';

const Footer = () => {
  const [tipList, setTipList] = useState([]);
  useEffect(() => {
    try {
      TipsAPI.getAll().then(setTipList);
    } catch (e) {
      console.log('error', e);
      // TODO this error happen if API is not available but business errors like length of password go above. how to handle and display those?
    }
  }, []);

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
        {tipList.map((tip, i) => (
          <ToastWrapper message={tip} timeOut={i + 1} position="bottom-right" key={tip._id} />
        ))}
      </Container>
    </footer>
  );
};

export default Footer;
