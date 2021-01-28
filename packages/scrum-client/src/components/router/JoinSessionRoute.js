import React from 'react';
import { Redirect, withRouter, useParams } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAuthState } from '../../context';

const isUserAdminForSession = (userid, roomId) => {
  // TODO - implement call to mongo to know if the user is the admin for that session
  // eslint-disable-next-line no-console
  console.log('isUserAdminForSession', userid, roomId);
  return true;
};

// TODO REMOVE ENTIRE FILE
const JoinSessionRoute = ({ location }) => {
  const { roomId } = useParams();
  const userDetails = useAuthState();
  const isUserAdmin = isUserAdminForSession(userDetails.user, roomId);
  let pathname = isUserAdmin ? PATHS.SESSION_PARTICIPATE : PATHS.VOTING_CARDS;
  pathname = pathname.replace(':roomId?', roomId);

  return (
    <Redirect
      to={{
        pathname,
        state: { redirectedFrom: location },
      }}
    />
  );
};
export default withRouter(JoinSessionRoute);
