// Pages
import Settings from '../settings/page';

const { render } = testLibReactUtils;

describe('Settings render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Settings />);

    expect(container).toMatchSnapshot();
  });
});
