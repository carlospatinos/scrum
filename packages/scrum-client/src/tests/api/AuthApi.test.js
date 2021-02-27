import { END_POINTS } from 'scrum-common';
import { AuthAPI } from '../../api';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

describe('AuthAPI', () => {
  test('login request', () => {
    Request.post = jest.fn();
    const payload = {};
    AuthAPI.login(payload);

    expect(Request.post).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.AUTH_LOCAL}`,
      payload
    );
  });
  test('login3pp request', () => {
    Request.get = jest.fn();

    AuthAPI.login3pp();
    expect(Request.get).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.AUTH}${END_POINTS.LOGIN_SUCCESS}`
    );
  });

  test('logout request', () => {
    Request.get = jest.fn();

    AuthAPI.logout();
    expect(Request.get).toHaveBeenCalled();
    expect(Request.get).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.LOGOUT}`
    );
  });

  test('signUp request', () => {
    Request.post = jest.fn();

    const payload = {};
    AuthAPI.signUp(payload);
    expect(Request.post).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.SIGN_UP}`,
      payload
    );
  });
});
