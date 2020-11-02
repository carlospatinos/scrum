import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useAppContext } from '../lib/contextLib';
import Logout from '../content/Logout';

// import { LinkContainer } from "react-router-bootstrap"; TODO use this to avoid refreshing the page

export default function Header() {
  const { isAuthenticated } = useAppContext();

  return (
    <header>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Scrum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated ? (
              <Nav className="justify-content-end" activeKey="/login">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link onClick={Logout.handleLogout()}>Logout</Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-end" activeKey="/login">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/joinSession">Join Session</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
