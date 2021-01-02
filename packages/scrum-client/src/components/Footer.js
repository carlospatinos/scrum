/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { END_POINTS } from 'scrum-common';
import ToastWrapper from './ToastWrapper/ToastWrapper';
import { API_CONSTANTS } from '../constants';

const Footer = () => {
  const [tipList, setTipList] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.TIPS_FOR_THE_SESSION}`,
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setTipList(data.tips);
        } else {
          console.log(data.message);
        }
      })
      .catch(e => {
        // console.error(`=====> error:${e}`);
        console.log(e);
        // TODO this erro happen if API is not available but business errors like length of password go above. how to handle and display those?
      });
  }, []);

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
        {tipList.map((tip, i) => (
          <ToastWrapper message={tip} timeOut={i + 1} position="bottom-right" key={tip._id} />
        ))}
      </Container>
    </footer>
  );
};

export default Footer;
