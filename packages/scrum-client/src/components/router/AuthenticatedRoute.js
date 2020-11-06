import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import TitledRoute from './TitledRoute';
import PATHS from '../../constants/paths';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

const AuthenticatedRoute = ({ authUserTypes, location, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN_NAME);
  return isAuthenticated ? (
    <TitledRoute {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: PATHS.LOGIN,
        state: { redirectedFrom: location },
      }}
    />
  );
};
export default withRouter(AuthenticatedRoute);
