import { render } from '@testing-library/react';

// Mocks
import { TotalStatisticList } from '@/ui/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

const queryClient = new QueryClient();

const setup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <TotalStatisticList />
    </QueryClientProvider>,
  );

describe('TotalList component', () => {
  it('renders correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
