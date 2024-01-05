import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// component
import Header from '../';

describe('Header render', () => {
  const renderComponent = ({ name }: { name?: string }) =>
    render(<Header name={name || 'Dashboard'} />, { wrapper: MemoryRouter });

  it('Should render match with snapshot.', () => {
    const { container } = renderComponent({});
    expect(container).toMatchSnapshot();
  });
});
