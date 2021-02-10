import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';

const remove = async payload => {
  // TODO - this request should be type delete
  return Request.post(
    `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.DELETE_PROFILE}`,
    payload
  );
};

export default {
  remove,
};
