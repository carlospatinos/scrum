import React from "react";
import { Route, Switch } from 'react-router-dom';
import { Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./content/Home";

function App() {
  return (
    <>
      <Header/>
      <main >
        <Container className="px-0">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
          </Switch>

        </Container>
      </main>
      <Footer/>
    </>
  );
}

export default App;
