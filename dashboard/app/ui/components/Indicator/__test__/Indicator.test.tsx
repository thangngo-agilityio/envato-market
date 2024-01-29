import { render } from '@testing-library/react';

// Component
import Indicator from '..';

describe('Indicator components', () => {
  it('match snapshot with open true', () => {
    const { container } = render(
      <Indicator isOpen={true}>Test Indicator</Indicator>,
    );

    expect(container).toMatchSnapshot();
  });
});
