import { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useAppContext } from '../../lib/contextLib';
import { API_BASE_URL } from '../../constants/apiConstants';
import PATHS from '../../constants/paths';

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

function Logout(props) {
  const { userHasAuthenticated } = useAppContext();
  const { location } = props;

  // const history = useHistory();

  /* eslint-disable */

  const handleLogout= ()  => {
    userHasAuthenticated(false);
    localStorage.clear();
    try {
      fetch(`${API_BASE_URL}/api/logout`, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // history.push('/login');
        });
    } catch (e) {
      // console.error(e);
    }
  }

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
