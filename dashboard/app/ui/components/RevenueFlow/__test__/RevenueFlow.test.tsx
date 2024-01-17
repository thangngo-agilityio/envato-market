import { render } from '@testing-library/react';

// Components
import { RevenueFlow } from '@/ui/components';

// Mock
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>Mocked Chart Component</div>,
}));

const queryClient = new QueryClient();

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <RevenueFlow />
    </QueryClientProvider>,
  );

describe('RevenueFlow component', () => {
  it('renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('handles changing the select option', async () => {
    const { getByRole, getByText } = setup();
    const select = getByRole('button');
    await userEvent.click(select);
    const selectOption = getByText('Jan - Jun');
    await userEvent.click(selectOption);

    expect(select.textContent).toBe('Jan - Jun');
  });
});
