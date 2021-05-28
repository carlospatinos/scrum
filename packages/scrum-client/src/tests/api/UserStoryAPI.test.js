import { END_POINTS } from 'scrum-common';
import { UserStoryAPI } from '../../api';
import { Request } from '../../util';
import { API_CONSTANTS } from '../../constants';

describe('UserStoryAPI', () => {
  test('get userStory request', () => {
    Request.get = jest.fn();
    const userStoryId = 'userStoryId';
    UserStoryAPI.get(userStoryId);

    expect(Request.get).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.USER_STORY}/userStoryId`
    );
  });

  test('create userStory request', () => {
    Request.post = jest.fn();
    const payload = {};
    UserStoryAPI.post(payload);

    expect(Request.post).toHaveBeenCalledWith(
      `${API_CONSTANTS.API_BASE_URL}${END_POINTS.API}${END_POINTS.USER_STORY}`,
      payload
    );
  });
});
