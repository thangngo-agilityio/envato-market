import React from 'react';
import { render } from '@testing-library/react';
import AuthLayout from '../layout';

describe('AuthLayout Component', () => {
  it('renders children within AccountSection', () => {
    const { container } = render(<AuthLayout />);

    expect(container).toMatchSnapshot();
  });
});
