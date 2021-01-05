import ContextUtil from './utils';
import { ACTIONS_POST } from './constants';

const LOGIN_ACTIONS = ContextUtil.generateActionTypes({
  featureName: 'LOGIN',
  restVerb: ACTIONS_POST,
});

export default LOGIN_ACTIONS;
