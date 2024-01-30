// Pages
import ForgotPasswordPage from '../forgot-password/page';

const { render } = testLibReactUtils;

describe('ForgotPasswordPage render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<ForgotPasswordPage />);

    expect(container).toMatchSnapshot();
  });
});
