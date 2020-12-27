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
                ? routes
                    .filter(route => {
                      return !route.isPrivate && route.isVisibleOnMenu;
                    })
                    .map(route => <Nav.Link href={route.path}>{route.title}</Nav.Link>)
                : routes
                    .filter(route => {
                      return route.isPrivate && route.isVisibleOnMenu;
                    })
                    .map(route => <Nav.Link href={route.path}>{route.title}</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
