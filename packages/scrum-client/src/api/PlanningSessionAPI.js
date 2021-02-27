import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';
import { handleResponse, handleError } from './response';

const getBaseURI = () =>
  `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}`;

const get = async roomId => {
  const response = await Request.get(`${getBaseURI()}/${roomId}`)
    .then(handleResponse)
    .catch(handleError);
  return response;
};

const post = async payload => {
  return Request.post(getBaseURI(), payload);
};

export default {
  get,
  post,
};
