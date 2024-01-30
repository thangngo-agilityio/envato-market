// Pages
import Register from '../register/page';

const { render } = testLibReactUtils;

describe('Register render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Register />);

    expect(container).toMatchSnapshot();
  });
});
