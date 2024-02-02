import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import { CustomerNameCell } from '@/ui/components';
import { IMAGES } from '@/lib/constants';

const setup = () =>
  render(
    <CustomerNameCell id={1} name="Duong Pham" image={IMAGES.AVATAR.url} />,
    {
      wrapper: Table,
    },
  );

describe('CustomerNameCell', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('Render', () => {
    const { getByText } = setup();

    expect(getByText('Duong Pham')).toBeDefined();
  });
});
