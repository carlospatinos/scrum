import React from 'react';
import { Container, CardDeck, Card } from 'react-bootstrap';

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
    </Container>
  );
};
export default Home;
