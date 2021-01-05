/* eslint-disable no-console */
import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';

import ContextUtil from './utils';
import LOGIN_ACTIONS from './actionTypes';

const loginUserPost = loginPayload => {
  return Request.post(
    `${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.AUTH_LOCAL}`,
    loginPayload
  );
};
export async function loginUser(dispatch, loginPayload) {
  try {
    const loginUserAction = ContextUtil.generateAction(dispatch, loginUserPost, LOGIN_ACTIONS);
    const response = await loginUserAction(loginPayload);
    const { data } = response;
    if (data.user) {
      localStorage.setItem(API_CONSTANTS.CURRENT_USER, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
  return undefined;
}

export async function login3ppUser(dispatch) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // 'Access-Control-Allow-Credentials': true,
    credentials: 'include',
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const response = await fetch(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.LOGIN_SUCCESS}`,
      requestOptions
    );

    const data = await response.json();
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem(API_CONSTANTS.CURRENT_USER, JSON.stringify(data));
      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.message });
    console.log(data.message);
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error });
    console.log(error);
  }
  return undefined;
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem(API_CONSTANTS.CURRENT_USER);
  localStorage.removeItem(API_CONSTANTS.ACCESS_TOKEN_NAME);
  // TODO is this needed? localStorage.clear();
  localStorage.clear();
}
