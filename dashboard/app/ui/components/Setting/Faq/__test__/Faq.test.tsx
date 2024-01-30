// FaqPage.test.js
import { render } from '@testing-library/react';

// Pages
import FaqPage from '..';

describe('FaqPage', () => {
  it('renders FaqPage component correctly', () => {
    const { asFragment } = render(<FaqPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
