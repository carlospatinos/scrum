import React from 'react';
import { Container, CardDeck, Card } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { PATHS } from '../../constants';

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
  const location = useLocation();
  const redirectedFrom = location.state?.redirectedFrom?.pathname || PATHS.HOME;

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
            <Card.Title>Ready to start?</Card.Title>
            <Card.Text>
              <Link
                to={{
                  pathname: PATHS.PLANNING_CONFIG,
                  state: { redirectedFrom: { pathname: redirectedFrom } },
                }}
              >
                Config a session
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '10rem' }}>
          <Card.Header>
            {' '}
            <h4>Looking for more?</h4>
          </Card.Header>
          <Card.Img
            variant="top"
            src="https://play-lh.googleusercontent.com/AECLjXX7mj2l13K2oOA3B9cSgEbIn30gs2UrT5vmOWjFuFbXGpyc_2vcwOmCjEVp=s140-rw"
          />
          <Card.Body>
            <Card.Title>We have also an android app</Card.Title>
            <Card.Text>
              <a href="https://play.google.com/store/apps/details?id=com.kinnettik.scrumtools">
                Scrum Tools
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </Container>
  );
};
export default Home;
