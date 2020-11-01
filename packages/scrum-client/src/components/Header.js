import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import { LinkContainer } from "react-router-bootstrap"; TODO use this to avoid refreshing the page

const Header = () => (
  <header>
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Scrum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  </header>
);

export default Header;
