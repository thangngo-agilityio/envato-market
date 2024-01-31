import '@testing-library/jest-dom';

// component
import { MainLayout } from '@/ui/layouts';

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

describe('MainLayout render', () => {
  const renderComponent = () =>
    renderQueryProviderTest(<MainLayout>Layout</MainLayout>);

  it('Should render match with snapshot.', () => {
    mockMobileMediaQuery();
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
