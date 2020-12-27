import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PATHS from '../constants/paths';
import routes from '../config/routes';
import { useAuthState } from '../context';

export default function Header() {
  const userDetails = useAuthState();
  return (
    <header>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href={PATHS.HOME}>Scrum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" activeKey={PATHS.LOGIN}>
              {!userDetails.login_access_token
                ? routes.map(route => {
                    return route.isPrivate || !route.isVisibleOnMenu ? (
                      <div />
                    ) : (
                      <Nav.Link href={route.path}>{route.title}</Nav.Link>
                    );
                  })
                : routes.map(route => {
                    return route.isPrivate && route.isVisibleOnMenu ? (
                      <Nav.Link href={route.path}>{route.title}</Nav.Link>
                    ) : (
                      <div />
                    );
                  })}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
