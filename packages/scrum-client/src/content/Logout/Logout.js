import { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS, PATHS } from '../../constants';
import { useAuthDispatch, logout } from '../../context';

const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

const handleLogout = dispatch => {
  logout(dispatch);
  try {
    fetch(`${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.LOGOUT}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        // TODO remove this?
        // eslint-disable-next-line no-console
        console.log(data);
      });
  } catch (e) {
    // console.error(e);
  }
};

function Logout(props) {
  const dispatch = useAuthDispatch();
  const { location } = props;

  useEffect(() => {
    handleLogout(dispatch);
  }, [dispatch]);

  return (
    <Redirect
      to={{
        pathname: PATHS.LOGIN,
        state: { redirectedFrom: location },
      }}
    />
  );
}
export default withRouter(Logout);
