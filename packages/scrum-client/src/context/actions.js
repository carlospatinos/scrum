/* eslint-disable no-console */
import { API_CONSTANTS } from '../constants';
import { CommonFunctions } from '../util';

import ContextUtil from './utils';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './actionTypes';
import { AuthAPI } from '../api';

const loginUserGeneric = async (dispatch, loginApiFxn, loginPayload) => {
  try {
    const loginUserAction = ContextUtil.generateAction(dispatch, loginApiFxn, LOGIN_ACTIONS);
    const response = await loginUserAction(loginPayload);
    const { data } = response;
    if (data.user) {
      CommonFunctions.setValueToLocalStorage(API_CONSTANTS.CURRENT_USER, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.log(error.message);
    return undefined;
  }
};

export async function loginUser(dispatch, loginPayload) {
  return loginUserGeneric(dispatch, AuthAPI.login, loginPayload);
}

export async function login3ppUser(dispatch) {
  return loginUserGeneric(dispatch, AuthAPI.login3pp);
}

export async function logout(dispatch) {
  const logoutUserAction = ContextUtil.generateAction(dispatch, AuthAPI.logout, LOGOUT_ACTIONS);
  const response = await logoutUserAction();
  localStorage.removeItem(API_CONSTANTS.CURRENT_USER);
  localStorage.removeItem(API_CONSTANTS.ACCESS_TOKEN_NAME);
  // TODO is this needed? localStorage.clear();
  localStorage.clear();
  // TODO  do we need the response?
  console.log('logout-response', response);
  return response;
}
