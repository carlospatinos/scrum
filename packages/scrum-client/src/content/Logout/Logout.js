import { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useAuthDispatch, logout } from '../../context';

function Logout(props) {
  const dispatch = useAuthDispatch();
  const { location } = props;

  useEffect(() => {
    logout(dispatch);
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
