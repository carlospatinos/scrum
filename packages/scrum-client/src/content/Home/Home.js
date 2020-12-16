import React, { useState } from 'react';
import { Row, Col, Container, CardDeck, Card } from 'react-bootstrap';

// import TagManager from 'react-gtm-module'

// if(process.env.NODE_ENV === "development" && !!process.env.REACT_APP_GTM_ID) {
//   document.title = "home";
//   console.log(document.title);
//   const tagManagerArgs = {
//     dataLayer: {
//       page: "home", //Specific to each page
//       pagePath: window.location.pathname + window.location.search, //"/home", //Specific to each page
//       title: "home"
//     },
//     dataLayerName: "PageDataLayer"
//   };
//   TagManager.dataLayer(tagManagerArgs);
// }

const Home = () => {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <Container>
      <Row>
        <Col>
          <div className="pricing-Home px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">Team</h1>
            <p className="lead">
              Quickly build an pricing table for your potential customers with this Bootstrap
              example. Its built with default Bootstrap components and utilities with little
              customization.
            </p>
          </div>
        </Col>
      </Row>
      <CardDeck className="mb-3 text-center">
        <Card className=" box-shadow">
          <Card.Header>
            <h4>Retro</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title />
            <Card.Text />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            {' '}
            <h4>Planning</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title />
            <Card.Text />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            {' '}
            <h4>Other</h4>
          </Card.Header>
          <Card.Body>
            <Card.Title />
            <Card.Text />
          </Card.Body>
        </Card>
      </CardDeck>
      <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        <Col
          xs={{ order: 1 }}
          md={{ size: 7, offset: 1 }}
          tag="section"
          className="py-5 mb-5 py-md-0 mb-md-0"
        >
          {/* LOAD OR UNLOAD THE CLIENT */}
          <button type="button" onClick={() => setLoadClient(prevState => !prevState)}>
            STOP CLIENT
          </button>
          {/* SOCKET IO CLIENT */}
          {loadClient ? <span>client</span> : null}
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
