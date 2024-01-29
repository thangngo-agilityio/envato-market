// Sections
import Loading from '../histories/loading';

const { render } = testLibReactUtils;

describe('Loading render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Loading />);

    expect(container).toMatchSnapshot();
  });
});
