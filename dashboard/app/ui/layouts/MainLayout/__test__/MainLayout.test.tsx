import '@testing-library/jest-dom';

// component
import { MainLayout } from '@/ui/layouts';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('MainLayout render', () => {
  const renderComponent = () =>
    renderQueryProviderTest(<MainLayout>Layout</MainLayout>);

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
