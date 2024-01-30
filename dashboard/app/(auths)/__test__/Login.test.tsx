// Pages
import LoginPage from '../login/page';

const { render } = testLibReactUtils;

describe('LoginPage render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<LoginPage />);

    expect(container).toMatchSnapshot();
  });
});
