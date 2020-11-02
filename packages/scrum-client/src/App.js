import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import TagManager from 'react-gtm-module'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './content/Home';
import Login from './content/Login';
import Signup from './content/Signup';
import NotFound from './content/NotFound';
import Logout from './content/Logout';

import { AppContext } from './lib/contextLib';

// const [isAuthenticated, userHasAuthenticated] = useState(false);
// if (process.env.NODE_ENV === "development" && !!process.env.REACT_APP_GTM_ID) {
//   const tagManagerArgs = {
//     gtmId: process.env.REACT_APP_GTM_ID,
//     dataLayerName: "PageDataLayer"
//   }
//   TagManager.initialize(tagManagerArgs, { debug: process.env.REACT_APP_GTM_DEBUG === 'true' });
// }

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Header />
        <main>
          <Container className="px-5">
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/logout" component={Logout} />
                <NotFound />
              </Switch>
            </Router>
          </Container>
        </main>
      </AppContext.Provider>
      <Footer />
    </>
  );
}

export default App;
