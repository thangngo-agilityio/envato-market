import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useTransactions } from '@/lib/hooks';

// Services
import * as services from '@/lib/services';

// Mocks
import { TRANSACTIONS } from '@/lib/mocks';

jest.mock('@/lib/services', () => ({
  getTransactions: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('@/lib/hooks', () => {
  const originalModule = jest.requireActual('@/lib/hooks');
  return {
    ...originalModule,
    handleSort: jest.fn(),
  };
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useTransactions', () => {
  it('should fetch transactions and apply sorting and filtering', async () => {
    const getTransactionsSpy = jest.spyOn(services, 'getTransactions');
    getTransactionsSpy.mockResolvedValue(TRANSACTIONS);

    const { result, rerender } = renderHook(
      () => useTransactions({ name: 'John', month: 'January' }),
      { wrapper },
    );
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await rerender();

    expect(getTransactionsSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.sortBy('name');
    });

    expect(getTransactionsSpy).toHaveBeenCalledWith(
      '',
      expect.any(Object),
      undefined,
    );
  });
});
