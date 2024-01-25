import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import BoxChat from '@/ui/components/BoxChat';

describe('BoxChatComponent', () => {
  test('BoxChat component renders correctly', () => {
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });

  test('calls handleSendMessage when the send button is clicked', async () => {
    render(<BoxChat />);

    const sendButton = screen.getByTestId('btn-send');
    await fireEvent.click(sendButton);

    waitFor(() => {
      expect(sendButton).toBeDisabled();
    });
  }, 2000);

  test('calls handleSendMessage when Enter key is pressed', () => {
    const handleSendMessage = jest.fn();
    render(<BoxChat />);

    const input = screen.getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Test message' } });

    fireEvent.keyDown(input, { key: 'Enter' });

    waitFor(() => {
      expect(handleSendMessage).toHaveBeenCalledWith('Test message');
    });
  });
});
