import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import TitledRoute from './TitledRoute';
import { PATHS, API_CONSTANTS } from '../../constants';

// TODO REMOVE ENTIRE FILE
const AuthenticatedRoute = ({ authUserTypes, location, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem(API_CONSTANTS.ACCESS_TOKEN_NAME);
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
