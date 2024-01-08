import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Components
import { OverallBalance } from '@app/components';

// Mock
import { OVERALL_BALANCE_MOCK } from '@app/mocks';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('OverallBalance component', () => {
  it('renders correctly', () => {
    const { container } = render(<OverallBalance {...OVERALL_BALANCE_MOCK} />);

    expect(container).toMatchSnapshot();
  });
  test('handleChangeSelect updates chartData correctly', async () => {
    render(<OverallBalance {...OVERALL_BALANCE_MOCK} />);

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
