import '@testing-library/jest-dom';

// component
import { Header } from '@/ui/layouts';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('Header render', () => {
  const renderComponent = () => renderQueryProviderTest(<Header />);

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
