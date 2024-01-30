import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import TermCondition from '..';

describe('TermCondition component', () => {
  it('should renders correctly', () => {
    const { container } = render(<TermCondition />);

    expect(container).toMatchSnapshot();
  });
});
