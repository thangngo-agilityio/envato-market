import { render, screen } from '@testing-library/react';

// Components
import { RevenueFlow } from '@/ui/components';

// Mock
import userEvent from '@testing-library/user-event';
import { INITIAL_REVENUE_FLOW } from '@/lib/mocks';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div>Mocked Chart Component</div>,
}));

// Mock the useGetStatistic hook
jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useGetStatistic: jest.fn(() => ({
    data: INITIAL_REVENUE_FLOW,
    isLoading: false,
    isError: false,
  })),
}));

describe('RevenueFlow component', () => {
  it('matches snapshot', () => {
    const { container } = render(<RevenueFlow />);
    expect(container).toMatchSnapshot();
  });

  it('handles changing the select option', async () => {
    render(<RevenueFlow />);
    const select = screen.getByRole('button');
    await userEvent.click(select);
    const selectOption = screen.getByText('Jan - Jun');
    await userEvent.click(selectOption);

    expect(select.textContent).toBe('Jan - Jun');
  });
});
