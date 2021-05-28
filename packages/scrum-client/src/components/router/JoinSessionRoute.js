import React, { useEffect, useState } from 'react';
import { Redirect, withRouter, useParams } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAuthState } from '../../context';
import { PlanningSessionAPI } from '../../api';

const isUserAdminForSession = async (userId, roomId) => {
  const data = await PlanningSessionAPI.get(roomId);
  console.log('data.userAdmin === userId', data.userAdmin === userId);
  console.log('data.userAdmin', data);
  console.log('userId', userId);
  return data.userAdmin === userId;
};

const JoinSessionRoute = ({ location }) => {
  const { roomId } = useParams();
  const userDetails = useAuthState();
  const [isUserAdmin, setIsUserAdmin] = useState(undefined);

  /* eslint-disable */
  useEffect(() => {
    console.log('userDetails', userDetails);
    isUserAdminForSession(userDetails.user._id, roomId).then(_isUserAdmin =>
      setIsUserAdmin(_isUserAdmin)
    );
  }, [roomId, userDetails.user._id]);
  /* eslint-enable */

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
