import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Hooks
import { useTransactions } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Mocks
import { TRANSACTIONS } from '@/lib/mocks';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { TTransaction } from '@/lib/interfaces';
import { sortByKey } from '@/lib/utils';

// jest.mock('@/lib/services', () => ({
//   getTransactions: jest.fn(),
// }));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// jest.mock('@/lib/hooks', () => {
//   const originalModule = jest.requireActual('@/lib/hooks');
//   return {
//     ...originalModule,
//     handleSort: jest.fn(),
//   };
// });

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useTransactions', () => {
  const transactionResponse: AxiosResponse<TTransaction[]> = {
    data: TRANSACTIONS,
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };
  jest.spyOn(MainHttpService, 'get').mockResolvedValue(transactionResponse);

  it('should fetch transactions data successfully', async () => {
    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(TRANSACTIONS));
  });

  it('should sort asc transactions successfully', async () => {
    const expectResult = sortByKey(TRANSACTIONS, 'amount', false);

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    result.current.sortBy('spent');

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });

  it('should sort desc transactions successfully', async () => {
    const expectResult = sortByKey(TRANSACTIONS, 'amount', true);

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    result.current.sortBy('spent');
    result.current.sortBy('spent');

    await waitFor(() => expect(result.current.data).toEqual(expectResult));
  });

  it('should update transactions successfully if have that item in cache', async () => {
    const updateTransactionResponse: AxiosResponse<string> = {
      data: 'success',
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(updateTransactionResponse);

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    result.current.updateTransaction({ transactionId: TRANSACTIONS[0]._id });

    await waitFor(() =>
      expect(jest.spyOn(MainHttpService, 'put')).toHaveBeenCalled(),
    );
  });

  it('should update transactions successfully if NO have that item in cache', async () => {
    const updateTransactionResponse: AxiosResponse<string> = {
      data: 'success',
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };
    jest
      .spyOn(MainHttpService, 'put')
      .mockResolvedValue(updateTransactionResponse);

    const { result } = renderHook(() => useTransactions(), {
      wrapper,
    });

    result.current.updateTransaction({ transactionId: '1' });

    await waitFor(() =>
      expect(jest.spyOn(MainHttpService, 'put')).toHaveBeenCalled(),
    );
  });
});
