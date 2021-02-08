import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';

const API_URI = `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}`;

const get = async roomId => {
  const response = await Request.get(`${API_URI}/${roomId}`);
  if (response.success) {
    return response.sessionInformation;
  }
  return response;
};

const post = async payload => {
  return Request.post(`${API_URI}`, payload);
};

export default {
  get,
  post,
};
