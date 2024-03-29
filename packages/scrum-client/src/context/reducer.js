import { API_CONSTANTS } from '../constants';
import { CommonFunctions } from '../util';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './actionTypes';

const user = CommonFunctions.getValueFromLocalStorage(API_CONSTANTS.CURRENT_USER, 'user');
const token = CommonFunctions.getValueFromLocalStorage(
  API_CONSTANTS.CURRENT_USER,
  'login_access_token'
);

export const authInitialState = {
  user: '' || user,
  login_access_token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.baseAction:
    case LOGOUT_ACTIONS.baseAction:
      return {
        ...initialState,
        loading: true,
      };
    case LOGIN_ACTIONS.successAction:
      return {
        ...initialState,
        user: action.payload.user,
        login_access_token: action.payload.login_access_token,
        loading: false,
      };
    case LOGIN_ACTIONS.failureAction:
    case LOGOUT_ACTIONS.failureAction:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case LOGOUT_ACTIONS.successAction:
      return {
        ...initialState,
        user: '',
        login_access_token: '',
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
