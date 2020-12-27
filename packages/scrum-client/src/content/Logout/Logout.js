import { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../../constants/apiConstants';
import { useAuthDispatch, logout } from '../../context';

import PATHS from '../../constants/paths';

const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};

function Logout(props) {
  const dispatch = useAuthDispatch();
  const { location } = props;
  const handleLogout = () => {
    logout(dispatch);
    try {
      fetch(`${API_BASE_URL}/api/logout`, requestOptions)
        .then(response => response.json())
        .then(data => {
          // TODO remove this?
          console.log(data);
        });
    } catch (e) {
      // console.error(e);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

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
