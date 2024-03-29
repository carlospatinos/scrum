import { END_POINTS } from 'scrum-common';
import { ProfileAPI } from '../../api';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

describe('ProfileAPI', () => {
  test('remove  profile request', () => {
    Request.del = jest.fn();
    const payload = {};
    ProfileAPI.remove(payload);

    expect(Request.del).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.DELETE_PROFILE}`,
      payload
    );
  });
});
