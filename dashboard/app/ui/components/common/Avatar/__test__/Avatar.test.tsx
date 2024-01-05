import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { Avatar } from '@/ui/components';

describe('Avatar render', () => {
  afterEach(cleanup);

  it('Should render match with snapshot.', () => {
    const { container } = render(<Avatar />);
    expect(container).toMatchSnapshot();
  });

  it('renders the image with correct src prop', () => {
    const avatarMock = {
      src: 'https://example.com/avatar.png',
      alt: 'alt mock',
    };
    render(<Avatar {...avatarMock} />);
    const avatarImage = screen.getByRole('img');
    expect(avatarImage).toHaveAttribute('alt', avatarMock.alt);
  });
});
