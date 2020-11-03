import { Redirect, withRouter } from 'react-router-dom';
import { useAppContext } from '../../lib/contextLib';
import { API_BASE_URL } from '../../constants/apiConstants';
import PATHS from '../../constants/paths';

function Logout(props) {
  const { userHasAuthenticated } = useAppContext();
  const { location } = props;

  // const history = useHistory();

  /* eslint-disable */
  function handleLogout() {
    userHasAuthenticated(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

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

  handleLogout();
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
