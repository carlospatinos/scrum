import { withRouter, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { login3ppUser, useAuthDispatch } from '../../context';
import { PATHS } from '../../constants';

const verifyOAuthUser = async props => {
  const { history, dispatch } = props;
  try {
    const response = await login3ppUser(dispatch);
    if (response.user === undefined) {
      history.push(PATHS.LOGIN);
    } else {
      history.push(PATHS.HOME);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

function OauthValidation() {
  const history = useHistory();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    verifyOAuthUser({ history, dispatch });
  }, [dispatch, history]);
  return <span />;
}
export default withRouter(OauthValidation);
