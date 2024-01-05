import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import BoxChat from '..';

describe('BoxChatComponent', () => {
  test('BoxChat component renders correctly', () => {
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });

  test('calls handleSendMessage when the send button is clicked', () => {
    const handleSendMessage = jest.fn();
    render(<BoxChat onSendMessage={handleSendMessage} />);

    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);

    expect(handleSendMessage).toHaveBeenCalledTimes(1);
  });

  test('calls handleChangeValue when the input value changes', () => {
    const handleChangeValue = jest.fn();
    render(<BoxChat onChange={handleChangeValue} />);

    const input = screen.getByPlaceholderText('Type your message here');
    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(handleChangeValue).toHaveBeenCalledWith('Test message');
  });

  test('calls handleSendMessage when Enter key is pressed', () => {
    const handleSendMessage = jest.fn();
    render(<BoxChat onSendMessage={handleSendMessage} />);

    const input = screen.getByPlaceholderText('Type your message here');
    fireEvent.change(input, { target: { value: 'Test message' } });

    fireEvent.keyDown(input, { key: 'Enter' });

    waitFor(() => {
      expect(handleSendMessage).toHaveBeenCalledWith('Test message');
    });
  });
});
