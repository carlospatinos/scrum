import React from 'react';
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
  return (
    <Container>
      <br />
      <br />
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
        />
      </Row>
    </Container>
  );
};
export default Home;
