import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// component
import Header from '../';

describe('Header render', () => {
  const renderComponent = ({ name }: { name?: string }) =>
    render(<Header name={name || 'Dashboard'} />);

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });
});
