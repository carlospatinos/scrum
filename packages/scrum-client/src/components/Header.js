import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import PATHS from '../constants/paths';
import routes from '../config/routes';
import { useAuthState } from '../context';

const visibleRoute = isUserLoggedIn => {
  const privacy = isUserLoggedIn ? route => route.isPrivate : route => !route.isPrivate;
  return route => privacy(route) && route.isVisibleOnMenu;
};

export default function Header() {
  const userDetails = useAuthState();
  const isLoggedIn = userDetails.login_access_token;
  const visibleRouteCriteria = visibleRoute(isLoggedIn);

  return (
    <header>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href={PATHS.HOME}>Scrum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" activeKey={PATHS.LOGIN}>
              {routes.filter(visibleRouteCriteria).map(route => (
                <Nav.Link key={route.path} href={route.path}>
                  {route.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
