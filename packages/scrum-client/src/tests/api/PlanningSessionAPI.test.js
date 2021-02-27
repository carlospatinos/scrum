import { END_POINTS } from 'scrum-common';
import { PlanningSessionAPI } from '../../api';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

describe('PlanningSessionAPI', () => {
  const SUCCESS_RESPONSE = { success: true, data: {} };
  const ERROR_RESPONSE = { success: false, data: {} };

  test('get request successfully', async () => {
    Request.get = jest.fn(() => Promise.resolve(SUCCESS_RESPONSE));
    const roomId = 'roomId';
    const response = await PlanningSessionAPI.get(roomId);
    expect(Request.get).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomId}`
    );
    expect(response).toEqual(SUCCESS_RESPONSE.data);
  });
  test('get request error', async () => {
    Request.get = jest.fn(() => Promise.resolve(ERROR_RESPONSE));
    const roomId = 'roomId';
    const response = await PlanningSessionAPI.get(roomId);
    expect(Request.get).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}/${roomId}`
    );
    expect(response.success).toBeFalsy();
    expect(response.data).toEqual(ERROR_RESPONSE.data);
  });
  test('post request', () => {
    Request.post = jest.fn();
    const payload = {};
    PlanningSessionAPI.post(payload);

    expect(Request.post).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.PLANNING_SESSION}`,
      payload
    );
  });
});
