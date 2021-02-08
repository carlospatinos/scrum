import React, { useEffect, useState } from 'react';
import { Redirect, withRouter, useParams } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAuthState } from '../../context';
import PlanningSession from '../../api/PlanningSession';

const isUserAdminForSession = async (userId, roomId) => {
  const sessionInformation = await PlanningSession.get(roomId);
  return sessionInformation.userAdmin === userId;
};

const JoinSessionRoute = ({ location }) => {
  const { roomId } = useParams();
  const userDetails = useAuthState();
  const [isUserAdmin, setIsUserAdmin] = useState(undefined);

  useEffect(() => {
    isUserAdminForSession(userDetails.user.id, roomId).then(_isUserAdmin =>
      setIsUserAdmin(_isUserAdmin)
    );
  }, [roomId, userDetails.user.id]);

  if (isUserAdmin === undefined) {
    return null;
  }

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
