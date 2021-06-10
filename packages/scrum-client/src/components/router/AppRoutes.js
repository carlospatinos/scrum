import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAuthState } from '../../context';

const AppRoutes = ({ component: Component, path, location, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !userDetails.login_access_token ? (
          <Redirect to={{ pathname: PATHS.LOGIN, state: { redirectedFrom: location } }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
