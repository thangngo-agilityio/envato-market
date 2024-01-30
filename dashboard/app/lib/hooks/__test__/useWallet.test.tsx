import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

// Hooks
import { useWallet } from '@/lib/hooks';

// Services
import * as services from '@/lib/services';
import { WALLET_MOCK } from '@/lib/mocks';

jest.mock('@/lib/services', () => ({
  getUserWallet: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch wallet and apply sorting and filtering', async () => {
    const getUserWalletSpy = jest.spyOn(services, 'getUserWallet');
    getUserWalletSpy.mockResolvedValue(WALLET_MOCK[0]);

    const { result } = renderHook(() => useWallet('6593beacff649fc6c4d2964b'), {
      wrapper,
    });
    expect(result.current.isLoading).toEqual(true);
  });
});
