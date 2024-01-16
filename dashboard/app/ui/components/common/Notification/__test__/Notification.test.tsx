import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Components
import { Notification } from '@/ui/components';

// Hooks
import { useNotification } from '@/lib/hooks';

// Constants
import { NOTIFICATION_LIST } from '@/lib/constants';

// Mocks
import { MOCK_USER_DETAIL } from '@/lib/mocks';

jest.mock('@app/hooks', () => ({
  ...jest.requireActual('@app/hooks'),
  useNotification: jest.fn(),
}));

describe('Avatar render', () => {
  const mockHandleUpdateNotification = jest.fn();
  beforeEach(() => {
    (useNotification as jest.Mock).mockReturnValue({
      quantity: 3,
      hasNewNotification: true,
      handleDeleteNotice: jest.fn(),
      handleUpdateMarkRead: mockHandleUpdateNotification,
    });
  });

  test('Should render match with snapshot.', () => {
    const { container } = render(
      <Notification colorFill="white" user={MOCK_USER_DETAIL} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('handleUpdateNotification should be called when a notification item is clicked', async () => {
    render(<Notification colorFill="white" user={MOCK_USER_DETAIL} />);

    const elementUpdate = screen.getByText(NOTIFICATION_LIST[0].content);

    await act(async () => {
      userEvent.click(elementUpdate);
    });

    expect(elementUpdate).toBeInTheDocument();
  });

  test('handleDeleteNotification should be called when delete icon is clicked', async () => {
    render(<Notification colorFill="white" user={MOCK_USER_DETAIL} />);

    const elementDelete = screen.getByText(NOTIFICATION_LIST[0].content);

    await act(async () => {
      userEvent.click(elementDelete);
    });

    expect(elementDelete).toBeInTheDocument();
  });
});
