import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';

const getBaseURI = endPoint => `${API_CONSTANTS.API_BASE_URL}${endPoint}`;
const getAuthURI = endPoint => `${getBaseURI(END_POINTS.AUTH)}${endPoint}`;

const login = payload => Request.post(getAuthURI(END_POINTS.AUTH_LOCAL), payload);

const login3pp = () => Request.get(getAuthURI(END_POINTS.LOGIN_SUCCESS));

const logout = () => Request.get(`${getBaseURI(END_POINTS.API)}${END_POINTS.LOGOUT}`);

const signUp = payload =>
  Request.post(`${getBaseURI(END_POINTS.API + END_POINTS.SIGN_UP)}`, payload);

export default {
  signUp,
  login,
  login3pp,
  logout,
};
