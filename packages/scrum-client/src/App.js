import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import TagManager from 'react-gtm-module'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./content/Home";
import Login from "./content/Login";
import Signup from "./content/Signup";
import NotFound from "./content/NotFound";

if(process.env.NODE_ENV === "production" && !!process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID,
    dataLayerName: "PageDataLayer"
  }
  TagManager.initialize(tagManagerArgs, {debug: process.env.REACT_APP_GTM_DEBUG === 'true'});
}


function App() {
  return (
    <>
      <Header />
      <main >
        <Container className="px-5">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <NotFound />
            </Switch>
          </BrowserRouter>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
