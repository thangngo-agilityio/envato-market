import { render } from '@testing-library/react';
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
});
