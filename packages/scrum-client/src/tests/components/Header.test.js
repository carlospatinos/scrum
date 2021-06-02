import { render, cleanup } from '../test-utils';
import Header from '../../components/Header';
import { useAuthState } from '../../context/context';
import { basicUser } from '../mocks/user';

jest.mock('../../context/context');
afterEach(cleanup);

describe('Header', () => {
  test('To match snapshot', () => {
    //   mock hook call
    useAuthState.mockReturnValue(basicUser);

    // render the component
    const { asFragment } = render(<Header />);

    // validates vs snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
