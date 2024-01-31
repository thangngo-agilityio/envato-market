import React from 'react';

// Layout
import Layout from '../layout';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

const mockMobileMediaQuery = () =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: true,
      media: '480px',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe('Layout Component', () => {
  it('renders children within AccountSection', () => {
    mockMobileMediaQuery();
    const { container } = renderQueryProviderTest(<Layout>Layout</Layout>);

    expect(container).toMatchSnapshot();
  });
});
