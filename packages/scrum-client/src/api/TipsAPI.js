import { END_POINTS } from 'scrum-common';
import { API_CONSTANTS } from '../constants';
import { Request } from '../util';

const getBaseURI = () =>
  `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.TIPS_FOR_THE_SESSION}`;

const getAll = async () => {
  const response = await Request.get(`${getBaseURI()}`);
  if (response.success) {
    return response.data;
  }
  return response;
};

export default {
  getAll,
};
