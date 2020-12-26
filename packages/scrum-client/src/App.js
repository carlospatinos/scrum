import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Footer from './components/Footer';

import routes from './config/routes';
import { AuthProvider } from './context';
import AppRoute from './components/router/AppRoutes';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthProvider>
        <main className="flex-fill">
          <Container className="px-5">
            <Router>
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
            </Router>
          </Container>
        </main>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;
