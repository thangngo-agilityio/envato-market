import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Components
import { Notification } from '@/ui/components';

// Hooks
import { useNotification } from '@/lib/hooks';

// Mocks
import { MOCK_USER_DETAIL } from '@/lib/mocks';
import {
  // ERROR_MESSAGES,
  NOTIFICATION_LIST,
  // SUCCESS_MESSAGES,
} from '@/lib/constants';

const deleteNotificationMock = jest.fn();
const updateNotificationMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useNotification: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

describe('Notification component', () => {
  beforeAll(() => {
    (useNotification as jest.Mock).mockReturnValue({
      data: NOTIFICATION_LIST,
      quantity: 3,
      hasNewNotification: true,
      deleteNotification: deleteNotificationMock,
      updateNotification: updateNotificationMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render match with snapshot.', () => {
    const { container } = render(
      <Notification colorFill="white" user={MOCK_USER_DETAIL} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('handleUpdateNotification should be called when a notification item is clicked', async () => {
    const { getByText, getByTestId } = render(
      <Notification colorFill="white" user={MOCK_USER_DETAIL} />,
    );

    const clickOpenMenu = getByTestId('click-menu-button');

    await userEvent.click(clickOpenMenu);

    const elementUpdate = getByText(NOTIFICATION_LIST[0].sender);

    await userEvent.click(elementUpdate);

    waitFor(() => {
      expect(updateNotificationMock).toHaveBeenCalledWith({
        userId: MOCK_USER_DETAIL?.id,
        notificationId: NOTIFICATION_LIST[0]._id,
        isMarkAsRead: true,
      });
    });
  });

  test('handle delete notification success', async () => {
    jest.spyOn(axios, 'delete').mockResolvedValue({});
    const { getByRole, getByTestId } = render(
      <Notification colorFill="white" user={MOCK_USER_DETAIL} />,
    );

    const clickOpenMenu = getByTestId('click-menu-button');

    await userEvent.click(clickOpenMenu);

    const deleteIcon = testLibReactUtils.screen.getByTestId(
      `delete-icon-${NOTIFICATION_LIST[2]._id}`,
    );

    await userEvent.click(deleteIcon);

    const confirmButton = getByRole('button', {
      name: /Delete/i,
    });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteNotificationMock).toHaveBeenCalledWith(
        {
          userId: MOCK_USER_DETAIL.id,
          notificationId: NOTIFICATION_LIST[2]._id,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
      deleteNotificationMock.mock.calls[0][1].onSuccess();
    });
  });
  test('handle delete notification failed', async () => {
    jest.spyOn(axios, 'delete').mockRejectedValue({});
    testLibReactUtils.render(
      <Notification colorFill="white" user={MOCK_USER_DETAIL} />,
    );

    const clickOpenMenu =
      testLibReactUtils.screen.getByTestId('click-menu-button');

    await userEvent.click(clickOpenMenu);

    const deleteIcon = testLibReactUtils.screen.getByTestId(
      `delete-icon-${NOTIFICATION_LIST[1]._id}`,
    );

    await userEvent.click(deleteIcon);

    const confirmButton = testLibReactUtils.screen.getByRole('button', {
      name: /Delete/i,
    });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteNotificationMock).toHaveBeenCalledWith(
        {
          userId: MOCK_USER_DETAIL.id,
          notificationId: NOTIFICATION_LIST[1]._id,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
      deleteNotificationMock.mock.calls[0][1].onError();
    });
  });
});
