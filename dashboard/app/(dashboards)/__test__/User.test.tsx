// Pages
import UsersPage from '../users/page';

const { render } = testLibReactUtils;

describe('UsersPage render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<UsersPage />);

    expect(container).toMatchSnapshot();
  });
});
