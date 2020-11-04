import React, { useState } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// import TagManager from 'react-gtm-module'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './content/Home';
import Login from './content/Login';
import Signup from './content/Signup';
import NotFound from './content/NotFound';
import Logout from './content/Logout';
import JoinSession from './content/JoinSession';
import PlanningConfig from './content/PlanningConfig';
import SessionStarted from './content/SessionStarted';

import { AppContext } from './lib/contextLib';
import PATHS from './constants/paths';
import { TitledRoute, AuthenticatedRoute } from './components/router';

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
                <TitledRoute exact path={PATHS.DEFAULT} component={Login} title="Login" />
                <AuthenticatedRoute exact path={PATHS.HOME} component={Home} title="Home" />
                <TitledRoute exact path={PATHS.LOGIN} component={Login} title="Login" />
                <TitledRoute exact path={PATHS.SIGNUP} component={Signup} title="Signup" />
                <TitledRoute exact path={PATHS.LOGOUT} component={Logout} title="Logout" />
                <TitledRoute
                  exact
                  path={PATHS.SESSION_STARTED}
                  component={SessionStarted}
                  title="Session Started"
                />
                <TitledRoute
                  exact
                  path={PATHS.PLANNING_CONFIG}
                  component={PlanningConfig}
                  title="Planning Config"
                />
                <TitledRoute
                  exact
                  path={PATHS.JOIN_SESSION}
                  component={JoinSession}
                  title="JoinSession"
                />
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
