import preloadAll from 'jest-next-dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
import { TransactionSection } from '..';

jest.mock('react-intersection-observer');

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

describe('TransactionSection render', () => {
  beforeEach(async () => {
    await preloadAll();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams(),
    );

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });
  });

  test('Should render match with snapshot.', () => {
    mockMobileMediaQuery();

    const { container } = renderQueryProviderTest(<TransactionSection />);

    expect(container).toMatchSnapshot();
  });
});
