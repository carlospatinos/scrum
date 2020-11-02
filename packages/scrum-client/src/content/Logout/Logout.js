import { useHistory } from 'react-router-dom';
import { useAppContext } from '../../lib/contextLib';
import { API_BASE_URL } from '../../constants/apiConstants';

export default function Logout() {
  const { userHasAuthenticated } = useAppContext();

  const history = useHistory();

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
          history.push('/login');
        });
    } catch (e) {
      // console.error(e);
    }
  }
}
