import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

// Hooks
import { useGetStatistic } from '@/lib/hooks';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import * as services from '@/lib/services';

// Mocks
import { SPENDING_STATISTICS_MOCK } from '@/lib/mocks';

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

jest.mock('@/lib/services');

describe('useGetStatistic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetch statistic data failed', async () => {
    jest
      .spyOn(services, 'getStatistical')
      .mockRejectedValue(new Error('error'));

    const { result } = renderHook(
      () => useGetStatistic(END_POINTS.STATISTICS),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.data).toBe(undefined);
    });
  });

  it('fetch statistic data successfully', async () => {
    jest
      .spyOn(services, 'getStatistical')
      .mockResolvedValue(SPENDING_STATISTICS_MOCK);
    const { result } = renderHook(
      () => useGetStatistic(END_POINTS.STATISTICS),
      {
        wrapper,
      },
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(SPENDING_STATISTICS_MOCK);
  });
});
