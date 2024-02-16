import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// component
import { Dropdown } from '@/ui/components';

// Constants
import { AUTHENTICATION_ROLE } from '@/lib/constants';

const renderComponent = ({
  name,
  permission,
}: {
  name?: string;
  permission?: string;
}) =>
  render(
    <Dropdown
      name={name}
      permission={permission}
      role={AUTHENTICATION_ROLE.MEMBER}
    />,
  );

describe('Dropdown render', () => {
  it('Should render match with snapshot.', async () => {
    const { container } = await renderComponent({
      name: 'John Doe',
      permission: 'Super Admin',
    });

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('Get Dropdown component', () => {
    const { getByTestId } = renderComponent({});

    const avatar = getByTestId('TestDropdown');

    expect(avatar).toBeTruthy();
  });
});
