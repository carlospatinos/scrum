import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';
import { handleResponse, handleError } from './response';

const getBaseURI = () =>
  `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}`;

const get = async sessionId => {
  const response = await Request.get(`${getBaseURI()}/${sessionId}`)
    .then(handleResponse)
    .catch(handleError);
  return response;
};

const remove = async sessionId => {
  const response = await Request.del(`${getBaseURI()}/${sessionId}`)
    .then(handleResponse)
    .catch(handleError);
  return response;
};

const post = async payload => {
  return Request.post(getBaseURI(), payload);
};

const getByAdminId = async adminId => {
  const response = await Request.get(`${getBaseURI()}/findByAdmin/${adminId}`)
    .then(handleResponse)
    .catch(handleError);
  return response;
};

export default {
  get,
  getByAdminId,
  remove,
  post,
};
