import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer className="footer">
    <Container>
      <p className="my-md-5 pt-md-5 border-top">
        <Row className="text-center">
          <Col md={12} className="py-5">
            <div className="mb-5 flex-center">
              {/* <a className="fb-ic"><i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a>
          <a className="tw-ic"><i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a>
          <a className="gplus-ic"><i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a>
          <a className="li-ic"><i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a>
          <a className="ins-ic"><i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a>
          <a className="pin-ic"><i className="fab fa-pinterest fa-lg white-text fa-2x"></i></a> */}
            </div>
          </Col>
          <Col md={12}>
            <img
              src="https://icon-asset.com/wp-content/uploads/facebook-transparent-png-white-and-facebook-logo-red-transparent-fb-icon-white-png-clipart.png"
              alt=""
              width="24"
              height="24"
              className="mb-2"
            />
            <small className="d-block mb-3 text-muted">
              © 2020 Copyright: Carlos.com
            </small>
          </Col>
        </Row>
      </p>
    </Container>
  </footer>
);

export default Footer;
