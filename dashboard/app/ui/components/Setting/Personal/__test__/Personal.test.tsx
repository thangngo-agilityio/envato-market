import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import UserForm from '..';
import userEvent from '@testing-library/user-event';

const client = new QueryClient();

const setup = () =>
  render(
    <QueryClientProvider client={client}>
      <UserForm />
    </QueryClientProvider>,
  );

describe('Personal Page test cases', () => {
  it('renders UserForm with content', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should handle submit form', async () => {
    setup();

    const mockInput = 'mock input';

    const firstNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /first name/i,
      hidden: true,
    });

    const lastNameInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /last name/i,
      hidden: true,
    });

    const emailInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /email/i,
      hidden: true,
    });

    const phoneInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /phone number \(optional\)/i,
      hidden: true,
    });

    const countryInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /country and region/i,
      hidden: true,
    });

    const cityInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /city/i,
      hidden: true,
    });

    const addressInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /address/i,
      hidden: true,
    });

    const postalCodeInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /postal code/i,
      hidden: true,
    });

    const facebookInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /facebook/i,
      hidden: true,
    });

    const twitterInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /twitter/i,
      hidden: true,
    });

    const linkedInInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /linkedin/i,
      hidden: true,
    });

    const youtubeInput = screen.getByRole<HTMLInputElement>('textbox', {
      name: /youtube/i,
      hidden: true,
    });

    await userEvent.type(firstNameInput, mockInput);
    await userEvent.type(lastNameInput, mockInput);
    await userEvent.type(emailInput, 'mockmail@gmail.com');
    await userEvent.type(phoneInput, '01234567890');
    await userEvent.type(countryInput, mockInput);
    await userEvent.type(cityInput, mockInput);
    await userEvent.type(addressInput, mockInput);
    await userEvent.type(postalCodeInput, '01234567890');
    await userEvent.type(facebookInput, mockInput);
    await userEvent.type(twitterInput, mockInput);
    await userEvent.type(linkedInInput, mockInput);
    await userEvent.type(youtubeInput, mockInput);
    await userEvent.type(firstNameInput, mockInput);

    const submitBtn = screen.getByRole<HTMLButtonElement>('button', {
      name: /btn\-save\-profile/i,
      hidden: true,
    });

    await userEvent.click(submitBtn);

    waitFor(() => {
      expect(submitBtn.disabled).toBeTruthy();
    });
  }, 20000);
});
