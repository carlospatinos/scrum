import { END_POINTS } from 'scrum-common';
import { TipsAPI } from '../../api';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

describe('TipsAPI', () => {
  const SUCCESS_RESPONSE = { success: true, data: {} };
  const ERROR_RESPONSE = { success: false, data: {} };
  const GET_ALL_URL = `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.TIPS_FOR_THE_SESSION}`;
  test('list all tips request successfully', async () => {
    Request.get = jest.fn(() => Promise.resolve(SUCCESS_RESPONSE));
    const response = await TipsAPI.getAll();
    expect(Request.get).toHaveBeenCalledWith(GET_ALL_URL);
    expect(response).toEqual(SUCCESS_RESPONSE.data);
  });
  test('list all tips request error', async () => {
    Request.get = jest.fn(() => Promise.resolve(ERROR_RESPONSE));
    const response = await TipsAPI.getAll();
    expect(Request.get).toHaveBeenCalledWith(GET_ALL_URL);
    expect(response.success).toBeFalsy();
    expect(response.data).toEqual(ERROR_RESPONSE.data);
  });
});
