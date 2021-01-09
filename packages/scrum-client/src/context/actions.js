/* eslint-disable no-console */
import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS, CommonFunctions } from '../constants';
import { Request } from '../util';

import ContextUtil from './utils';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './actionTypes';

// Move to UserAPICalls or something
const loginUserPost = loginPayload =>
  Request.post(
    `${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.AUTH_LOCAL}`,
    loginPayload
  );
const login3ppUserGet = () =>
  Request.get(`${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.LOGIN_SUCCESS}`);

const logoutUserGet = () =>
  Request.get(`${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.LOGOUT}`);

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
  return loginUserGeneric(dispatch, loginUserPost, loginPayload);
}

export async function login3ppUser(dispatch) {
  return loginUserGeneric(dispatch, login3ppUserGet);
}

export async function logout(dispatch) {
  const logoutUserAction = ContextUtil.generateAction(dispatch, logoutUserGet, LOGOUT_ACTIONS);
  const response = await logoutUserAction();
  localStorage.removeItem(API_CONSTANTS.CURRENT_USER);
  localStorage.removeItem(API_CONSTANTS.ACCESS_TOKEN_NAME);
  // TODO is this needed? localStorage.clear();
  localStorage.clear();
  // TODO  do we need the response?
  console.log('logout-response', response);
  return response;
}
