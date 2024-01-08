import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { TotalBalance } from '@/ui/components';

describe('TotalBalance render', () => {
  afterEach(cleanup);

  test('Should render match with snapshot.', () => {
    const { container } = render(<TotalBalance />);

    expect(container).toMatchSnapshot();
  });

  test('Should render get TotalBalance component', () => {
    const { getByText } = render(<TotalBalance />);
    const totalBalance = getByText('Total Balance');

    expect(totalBalance).toBeInTheDocument();
  });
});
