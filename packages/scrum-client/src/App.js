import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./content/Home";
import Login from "./content/Login";
import NotFound from "./content/NotFound";


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
