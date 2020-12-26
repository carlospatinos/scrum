import React from 'react';
import { Row, Col, Container, CardDeck, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch, logout, useAuthState } from '../../context';
// import { API_BASE_URL } from '../../constants/apiConstants';
import PATHS from '../../constants/paths';
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
  // const [userName, setUserName] = useState('');
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();
  const history = useHistory();
  const handleLogout = () => {
    logout(dispatch);
    history.push(PATHS.HOME);
  };

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Credentials': true,
  //     },
  //   };
  //   try {
  //     fetch(`${API_BASE_URL}${PATHS.LOGIN_SUCCESS}`, requestOptions)
  //       .then(response => response.json())
  //       .then(data => {
  //         // eslint-disable-next-line
  //         console.log(data);
  //         if (data && data.user) {
  //           setUserName(data.user.firstName);
  //         }
  //       });
  //   } catch (e) {
  //     // eslint-disable-next-line
  //     console.error(e);
  //   }
  // }, []);
  return (
    <Container>
      <Row>
        <Col>
          <div className="pricing-Home px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 className="display-4">User: {userDetails.user.email}</h1>
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
        />
      </Row>
      <Button onClick={handleLogout}>Logout</Button>
    </Container>
  );
};
export default Home;
