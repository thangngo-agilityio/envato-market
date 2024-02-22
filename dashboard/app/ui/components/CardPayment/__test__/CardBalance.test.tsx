// YourComponent.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import CardBalance from '../CardBalance'; // Import the component to be tested
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  usePinCode: jest.fn(),
}));

jest.mock('@/lib/stores', () => ({
  ...jest.requireActual('@/lib/stores'),
  authStore: jest.fn().mockImplementation(() => ({ user: { pinCode: null } })),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(),
  useDisclosure: jest.fn(() => ({ isOpen: false, onToggle: jest.fn() })),
}));

describe('CardPayment', () => {
  test('CardPayment component renders correctly', () => {
    const usePinCodeMock = jest.requireMock('@/lib/hooks').usePinCode;
    usePinCodeMock.mockReturnValue({
      isConfirmPinCodeModalOpen: false,
      isSetPinCodeModalOpen: false,
      handleSetPinCode: jest.fn(),
      handleConfirmPinCode: jest.fn(),
      onCloseConfirmPinCodeModal: jest.fn(),
      onCloseSetPinCodeModal: jest.fn(),
      onOpenConfirmPinCodeModal: jest.fn(),
      onOpenSetPinCodeModal: jest.fn(),
    });
    const { container } = render(<CardBalance balance={0} />);

    expect(container).toMatchSnapshot();
  });

  it('updates isSetPinCodeModalOpen state when button is clicked', async () => {
    const usePinCodeMock = jest.requireMock('@/lib/hooks').usePinCode;
    usePinCodeMock.mockReturnValue({
      isSetPinCodeModalOpen: true,
      onOpenSetPinCodeModal: jest.fn(),
      onCloseSetPinCodeModal: jest.fn(),
    });

    render(<CardBalance balance={0} />);

    userEvent.click(screen.getByTestId('btn-eye'));

    await act(async () => {});

    const { isSetPinCodeModalOpen } = usePinCodeMock();

    expect(isSetPinCodeModalOpen).toBe(true);
  });

  it('opens Set PIN code modal when user has no PIN code', async () => {
    const usePinCodeMock = jest.requireMock('@/lib/hooks').usePinCode;
    const onCloseSetPinCodeModalMock = jest.fn();
    usePinCodeMock.mockReturnValue({
      isSetPinCodeModalOpen: true,
      onOpenSetPinCodeModal: jest.fn(),
      onCloseSetPinCodeModal: onCloseSetPinCodeModalMock,
    });

    render(<CardBalance balance={0} />);

    userEvent.click(screen.getByTestId('btn-eye'));

    await act(async () => {});

    const { isSetPinCodeModalOpen } = usePinCodeMock();

    const cancelBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Cancel',
      hidden: true,
    });

    await userEvent.click(cancelBtn);

    expect(onCloseSetPinCodeModalMock).toHaveBeenCalled();

    expect(isSetPinCodeModalOpen).toBe(true);

    expect(
      screen.getByText('Please set the PIN code to your account'),
    ).toBeInTheDocument();
  });
});
