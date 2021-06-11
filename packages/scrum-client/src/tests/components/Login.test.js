import { render, cleanup } from '../test-utils';
import Login from '../../content/Login';
import { useAuthState } from '../../context/context';
import { basicUser } from '../mocks/user';

jest.mock('../../context/context');
afterEach(cleanup);

describe('Login', () => {
  test('To match snapshot', () => {
    //   mock hook call
    useAuthState.mockReturnValue(basicUser);

    // render the component
    const { asFragment } = render(<Login />);

    // validates vs snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
