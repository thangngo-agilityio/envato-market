import { render } from '@testing-library/react';
import FallbackImage from '..';

describe('FallbackImage component', () => {
  it('Should render correctly', () => {
    const { container } = render(<FallbackImage alt="Test Image" />);

    expect(container).toMatchSnapshot();
  });
});
