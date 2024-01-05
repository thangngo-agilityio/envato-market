import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import CardPayment from '@/ui/components/CardPayment';
import userEvent from '@testing-library/user-event';

describe('CardPayment test cases', () => {
  const setup = () => render(<CardPayment balance={123} />);

  test('CardPayment component renders correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  test('should invoke handleChange function to prevent negative number when typing money amount', async () => {
    const { container } = setup();
    const moneyInput = container.querySelector<HTMLInputElement>(
      'input[name="money"]',
    );

    if (moneyInput) {
      await userEvent.type(moneyInput, '-123');

      expect(moneyInput.value).toBe('123');
    }
  });

  test('should hide money amount when clicking the eye icon button', async () => {
    setup();
    const eyeButton = screen.getByRole<HTMLButtonElement>('button', {
      name: /eye/i,
    });

    await userEvent.click(eyeButton);

    const hiddenTextField = screen.getByText(/\*\*\*\*\*\*/i);

    expect(hiddenTextField).toBeDefined();
  });
});
