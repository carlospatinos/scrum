/* eslint-disable no-shadow */
import { CURRENT_USER } from '../constants/apiConstants';

const user = localStorage.getItem(CURRENT_USER)
  ? JSON.parse(localStorage.getItem(CURRENT_USER)).user
  : '';
const token = localStorage.getItem(CURRENT_USER)
  ? JSON.parse(localStorage.getItem(CURRENT_USER)).login_access_token
  : '';

export const initialState = {
  user: '' || user,
  login_access_token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        login_access_token: action.payload.login_access_token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        login_access_token: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
