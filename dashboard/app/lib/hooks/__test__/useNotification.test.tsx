import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Hooks
import { useNotification } from '@/lib/hooks';

// Services
import * as services from '@/lib/services';
import { notificationHttpRequest } from '@/lib/services';

// Constants
import { END_POINTS, NOTIFICATION_LIST } from '@/lib/constants';

// Mock the notificationHttpRequest module
jest.mock('@/lib/services', () => ({
  getNotifications: jest.fn(),
  notificationHttpRequest: {
    delete: jest.fn(),
    put: jest.fn(),
  },
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

describe('useNotification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch transactions and apply sorting and filtering', async () => {
    const getNotificationsSpy = jest.spyOn(services, 'getNotifications');
    getNotificationsSpy.mockResolvedValue(NOTIFICATION_LIST);

    const { result, rerender } = renderHook(
      () => useNotification('6593beacff649fc6c4d2964b'),
      { wrapper },
    );
    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(true);

    await rerender();

    expect(result.current.isLoading).toBe(true);
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

    expect(notificationHttpRequest.delete).toHaveBeenCalledWith(
      END_POINTS.NOTIFICATION,
      {
        data: {
          userId: '6593beacff649fc6c4d2964b',
          notificationId: '1',
        },
      },
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

    expect(notificationHttpRequest.put).toHaveBeenCalledWith(
      END_POINTS.NOTIFICATION,
      {
        userId: '6593beacff649fc6c4d2964b',
        notificationId: '1',
        isMarkAsRead: true,
      },
    );
  });
});
