// Component

import Security from '../Security';

const { render } = testLibReactUtils;
describe('FaqPage', () => {
  it('renders FaqPage component correctly', () => {
    const { asFragment } = render(<Security />);

    expect(asFragment()).toMatchSnapshot();
  });
});
