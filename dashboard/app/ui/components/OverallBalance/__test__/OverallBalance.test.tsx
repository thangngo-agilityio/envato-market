import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Components
import { OverallBalance } from '@/ui/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

const queryClient = new QueryClient();

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <OverallBalance />
    </QueryClientProvider>,
  );

describe('OverallBalance component', () => {
  it('renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
  test('handleChangeSelect updates chartData correctly', async () => {
    setup();

    const menuButton = screen.getByRole('button', {
      name: /jan \- dec/i,
      hidden: true,
    });

    await userEvent.click(menuButton);

    const monthlySelectItem = screen.getByRole('menuitem', {
      name: /jan \- jun/i,
      hidden: true,
    });

    await userEvent.click(monthlySelectItem);
    waitFor(() => expect(screen.getByText('Jan - Jun')).toBeInTheDocument());
  });
});
