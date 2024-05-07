import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

// Hooks
import { useNotification } from '@/lib/hooks';

// Services
import { MainHttpService } from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

// Interface
import { TNotification } from '@/lib/interfaces';

// Mocks
import { NOTIFICATION } from '@/lib/mocks';

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

describe('useNotification', () => {
  const notificationData: AxiosResponse<{ data: TNotification[] }> = {
    data: { data: NOTIFICATION },
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  };

  jest.spyOn(MainHttpService, 'get').mockResolvedValue(notificationData);

  it('should fetch notification data successfully', async () => {
    const { result } = renderHook(() => useNotification(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.data).toEqual(NOTIFICATION));
  });

  it('deletes a notification successfully', async () => {
    const { result } = renderHook(
      () => useNotification('6593beacff649fc6c4d2964b'),
      { wrapper },
    );

    await act(async () => {
      await result.current.deleteNotification({
        userId: '6593beacff649fc6c4d2964b',
        notificationId: '1',
      });
    });

    expect(jest.spyOn(MainHttpService, 'delete')).toHaveBeenCalledWith(
      END_POINTS.NOTIFICATION,
      { data: { notificationId: '1', userId: '6593beacff649fc6c4d2964b' } },
    );
  });

  it('updates a notification successfully', async () => {
    const { result } = renderHook(
      () => useNotification('6593beacff649fc6c4d2964b'),
      { wrapper },
    );

    await act(async () => {
      await result.current.updateNotification({
        userId: '6593beacff649fc6c4d2964b',
        notificationId: '1',
        isMarkAsRead: true,
      });
    });

    expect(jest.spyOn(MainHttpService, 'put')).toHaveBeenCalledWith(
      END_POINTS.NOTIFICATION,
      {
        userId: '6593beacff649fc6c4d2964b',
        notificationId: '1',
        isMarkAsRead: true,
      },
    );
  });
});
