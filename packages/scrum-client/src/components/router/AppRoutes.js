import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { useAuthState } from '../../context';

const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={props =>
        isPrivate && !userDetails.login_access_token ? (
          <Redirect to={{ pathname: PATHS.LOGIN }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
