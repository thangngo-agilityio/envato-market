// Pages
import Dashboard from '../page';

const { render } = testLibReactUtils;

describe('Dashboard render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Dashboard />);

    expect(container).toMatchSnapshot();
  });
});
