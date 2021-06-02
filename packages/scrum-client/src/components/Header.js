import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Figure } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { PATHS } from '../constants';
import routes from '../config/routes';
import { useAuthState } from '../context';
import './Header.css';

const visibleRoute = isUserLoggedIn => {
  const privacy = isUserLoggedIn ? route => route.isPrivate : route => !route.isPrivate;
  return route => privacy(route) && route.isVisibleOnMenu;
};

export default function Header() {
  const userDetails = useAuthState();
  const location = useLocation();
  const isLoggedIn = userDetails.login_access_token;
  const visibleRouteCriteria = visibleRoute(isLoggedIn);
  const { t } = useTranslation();

  // TODO to a function
  const image =
    userDetails.user.profileImageUrl === undefined
      ? '/icons/default-profile.png'
      : userDetails.user.profileImageUrl;

  return (
    <header>
      <div>
        <Navbar variant="dark" className="bg-primary fixed-top navbar-expand-md" expand="lg">
          <Navbar.Brand className="" href={PATHS.HOME}>
            <img src="/appLogo.svg" alt={t(`Header.altLogo`)} />
            <strong className="align-middle">{t(`Header.titleBrand`)}</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" activeKey={location.pathname}>
              {routes.filter(visibleRouteCriteria).map(route =>
                route.path === PATHS.PROFILE ? (
                  <NavDropdown
                    key={route.path}
                    title={t(`Routes.${route.title}`)}
                    id="basic-nav-dropdown"
                  >
                    <Figure variant="top" className="d-flex justify-content-center">
                      <Figure.Image
                        roundedCircle
                        width={70}
                        height={70}
                        alt={t(`Header.altProfilePic`)}
                        src={image}
                      />
                    </Figure>
                    <div className="d-flex justify-content-center">
                      {userDetails.user.firstName} {userDetails.user.lastName}
                    </div>
                    <div className="d-flex justify-content-center">
                      <small className="text-secondary">{userDetails.user.email}</small>
                    </div>
                    <NavDropdown.Item eventKey="manage" className="d-flex justify-content-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="rounded-pill"
                        disabled
                      >
                        <strong>{t('Header.btnManageYourAccount')}</strong>
                      </Button>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <Nav.Link
                      key={PATHS.LOGOUT}
                      href={PATHS.LOGOUT}
                      className="d-flex justify-content-center"
                    >
                      <Button variant="outline-secondary" size="sm" className="rounded">
                        {t('Routes.logout')}
                      </Button>
                    </Nav.Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="policy">
                      <small className="text-secondary">{t('Header.lblPrivacyPolicy')}</small>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="terms">
                      <small className="text-secondary">{t('Header.lblTermsAndConditions')}</small>
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link key={route.path} href={route.path} active={route.isActive}>
                    <strong>{t(`Routes.${route.title}`)}</strong>
                  </Nav.Link>
                )
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}
