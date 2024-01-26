// Sections
import Inbox from '../inbox/page';

const { render } = testLibReactUtils;

describe('Inbox render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<Inbox />);

    expect(container).toMatchSnapshot();
  });
});
