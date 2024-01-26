import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { TotalBalance } from '@/ui/components';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('TotalBalance render', () => {
  afterEach(cleanup);

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<TotalBalance />);

    expect(container).toMatchSnapshot();
  });

  test('Should render get TotalBalance component', () => {
    const { getByText } = renderQueryProviderTest(<TotalBalance />);
    const totalBalance = getByText('Add Money');

    expect(totalBalance).toBeInTheDocument();
  });
});
