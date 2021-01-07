import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './config/routes';
import { AuthProvider } from './context';
import AppRoute from './components/router/AppRoutes';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthProvider>
        <Header />
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
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
