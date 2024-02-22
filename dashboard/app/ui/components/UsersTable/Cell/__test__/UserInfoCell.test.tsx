import { render } from '@testing-library/react';
import { UserInfoCell } from '..';
import { Table, Tr } from '@chakra-ui/react';

describe('TotalCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Table>
        <Tr>
          <UserInfoCell
            name="test"
            imageURL="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
            email="test@gmail.com"
          />
        </Tr>
      </Table>,
    );

    expect(container).toMatchSnapshot();
  });
});
