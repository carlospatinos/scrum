import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useAppContext } from '../lib/contextLib';
import PATHS from '../constants/paths';

// import { LinkContainer } from "react-router-bootstrap"; TODO use this to avoid refreshing the page

export default function Header() {
  const { isAuthenticated } = useAppContext();

  return (
    <header>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href={PATHS.HOME}>Scrum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isAuthenticated ? (
              <Nav className="justify-content-end" activeKey={PATHS.LOGIN}>
                <Nav.Link href={PATHS.HOME}>Home</Nav.Link>
                <Nav.Link href={PATHS.PROFILE}>Profile</Nav.Link>
                <Nav.Link href={PATHS.LOGOUT}>Logout</Nav.Link>
                <Nav.Link href={PATHS.PLANNING_CONFIG}>Planning Config</Nav.Link>
                <Nav.Link href={PATHS.SESSION_STARTED}>Session Started</Nav.Link>
                <Nav.Link href={PATHS.VOTING_CARDS}>Voting Cards</Nav.Link>
                <Nav.Link href={PATHS.PRIVACY_POLICY}>Privacy Policy</Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-end" activeKey={PATHS.LOGIN}>
                <Nav.Link href={PATHS.LOGIN}>Login</Nav.Link>
                <Nav.Link href={PATHS.LOGOUT}>Logout</Nav.Link>
                <Nav.Link href={PATHS.NEW_LOGIN}>Login2</Nav.Link>
                <Nav.Link href={PATHS.SIGNUP}>Signup</Nav.Link>
                <Nav.Link href={PATHS.PLANNING_CONFIG}>Planning Config</Nav.Link>
                <Nav.Link href={PATHS.SESSION_STARTED}>Session Started</Nav.Link>
                <Nav.Link href={PATHS.VOTING_CARDS}>Voting Cards</Nav.Link>
                <Nav.Link href={PATHS.PRIVACY_POLICY}>Privacy Policy</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
