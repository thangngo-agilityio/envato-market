import '@testing-library/jest-dom';

// component
import AuthFooterComponent from '..';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('Auth footer component render', () => {
  const renderComponent = () =>
    renderQueryProviderTest(<AuthFooterComponent />);

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
