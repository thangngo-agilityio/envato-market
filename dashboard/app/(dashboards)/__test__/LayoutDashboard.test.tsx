import React from 'react';

// Layout
import Layout from '../layout';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('Layout Component', () => {
  it('renders children within AccountSection', () => {
    const { container } = renderQueryProviderTest(<Layout>Layout</Layout>);

    expect(container).toMatchSnapshot();
  });
});
