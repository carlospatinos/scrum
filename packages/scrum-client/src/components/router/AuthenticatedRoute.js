import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import TitledRoute from './TitledRoute';
import PATHS from '../../constants/paths';
import { useAppContext } from '../../lib/contextLib';

const AuthenticatedRoute = ({ authUserTypes, location, ...rest }) => {
  const { isAuthenticated } = useAppContext();
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
