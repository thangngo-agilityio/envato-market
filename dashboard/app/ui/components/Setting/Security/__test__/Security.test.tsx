import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// Components
import Security from '..';

const client = new QueryClient();

const setup = () =>
  render(
    <QueryClientProvider client={client}>
      <Security />
    </QueryClientProvider>,
  );

describe('Security Page test cases', () => {
  it('renders Security with content', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should handle submit form', async () => {
    setup();

    const mockInput = 'mock input';

    const oldPassword = screen.getByRole('textbox', {
      name: /oldPassword/i,
      hidden: true,
    });

    const newPassword = screen.getByRole<HTMLInputElement>('textbox', {
      name: /newPassword/i,
      hidden: true,
    });

    await userEvent.type(oldPassword, mockInput);
    await userEvent.type(newPassword, mockInput);

    const submitBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: /btn\-save\-change/i,
      hidden: true,
    });

    await userEvent.click(submitBtn);

    waitFor(() => {
      expect(submitBtn.disabled).toBeTruthy();
    });
  }, 20000);
});
