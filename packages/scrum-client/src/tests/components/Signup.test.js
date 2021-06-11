import { render, cleanup } from '../test-utils';
import Signup from '../../content/Signup';
import { useAuthState } from '../../context/context';
import { basicUser } from '../mocks/user';

jest.mock('../../context/context');
afterEach(cleanup);

describe('Signup', () => {
  test('To match snapshot', () => {
    //   mock hook call
    useAuthState.mockReturnValue(basicUser);

    // render the component
    const { asFragment } = render(<Signup />);

    // validates vs snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
