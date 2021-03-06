import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
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
      <AuthProvider>
        <Header />
        <ErrorBoundary>
          <main className="flex-fill">
            <Container className="px-5">
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
            </Container>
          </main>
        </ErrorBoundary>
      </AuthProvider>
      <CookieConsent
        location="none"
        overlay="true"
        cookieName="scrum-cookie-consent"
        buttonText={t('CookieConsent.buttonText')}
        expires={365}
      >
        {t('CookieConsent.message')}
      </CookieConsent>
      <Footer />
    </div>
  );
}

export default App;
