// Pages
import SupportsPageMemorize from '../supports/page';

const { render } = testLibReactUtils;

describe('SupportsPageMemorize render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<SupportsPageMemorize />);

    expect(container).toMatchSnapshot();
  });
});
