import '@testing-library/jest-dom';

// component
import { AuthHeader } from '../..';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('Auth Header component render', () => {
  const renderComponent = (path?: string) =>
    renderQueryProviderTest(<AuthHeader title="test" pathName={path} />);

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('Should be displayed if pathName is different from the path', () => {
    const { container } = renderComponent('/some/other/path');
    expect(container).toBe('/some/other/path');
  });
});
