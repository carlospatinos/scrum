import ContextUtil from './utils';
import { ACTIONS_POST } from './constants';

const LOGIN_ACTIONS = ContextUtil.generateActionTypes({
  featureName: 'LOGIN',
  restVerb: ACTIONS_POST,
});
const LOGOUT_ACTIONS = ContextUtil.generateActionTypes({
  featureName: 'LOGOUT',
});

export { LOGIN_ACTIONS, LOGOUT_ACTIONS };
