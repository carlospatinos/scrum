/* eslint-disable no-console */
import { END_POINTS } from 'scrum-common';
import { API_BASE_URL, ACCESS_TOKEN_NAME, CURRENT_USER } from '../constants/apiConstants';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // 'Access-Control-Allow-Credentials': true,
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const response = await fetch(
      `${API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.AUTH_LOCAL}`,
      requestOptions
    );
    const data = await response.json();
    // TODO remove consoles?
    console.log('loginPayload', loginPayload);
    console.log('data: ', data);

    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem(CURRENT_USER, JSON.stringify(data));
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
  localStorage.removeItem(CURRENT_USER);
  localStorage.removeItem(ACCESS_TOKEN_NAME);
  // TODO is this needed? localStorage.clear();
  localStorage.clear();
}
