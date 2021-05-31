import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Spinner, Row, Col } from 'react-bootstrap';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import routes from './config/routes';
import { AuthProvider } from './context';
import AppRoute from './components/router/AppRoutes';

function App() {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* TODO See why the message is not showing */}
      <CookieConsent
        location="bottom"
        overlay="true"
        cookieName="scrum-cookie-consent"
        buttonText={t('CookieConsent.buttonText')}
        expires={365}
        contentStyle={{
          color: 'white',
          fontWeight: 'bolder',
        }}
        style={{ width: '90%' }}
      >
        {t('CookieConsent.message')}
      </CookieConsent>
      <AuthProvider>
        <Header className="flex-shrink: 0" />
        <ErrorBoundary>
          <main className="container-fluid d-flex flex-column flex-grow-1">
            <Row className="flex-grow-1">
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <Router>
                  <Suspense fallback={<Spinner animation="border" />}>
                    <Switch>
                      {routes.map(route => (
                        <AppRoute
                          key={route.path}
                          path={route.path}
                          component={route.component}
                          isPrivate={route.isPrivate}
                        />
                      ))}
                    </Switch>
                  </Suspense>
                </Router>
              </Col>
            </Row>
          </main>
        </ErrorBoundary>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
