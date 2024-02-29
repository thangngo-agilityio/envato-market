import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { IMAGES } from '@/lib/constants';

// Message
import Message from '@/ui/components/BoxChat/Message';

describe('Message component', () => {
  const mockLocaleTime = new Date(1702543868252).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  it('renders correctly', () => {
    const { container } = render(
      <Message
        content="This is message"
        avatarAdmin={IMAGES.CHAT_USER_AVATAR.url}
        avatarUser={IMAGES.CHAT_USER_AVATAR.url}
        localeTime={mockLocaleTime}
        senderId="1"
        superAdminId="1"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render text content and current time when no input localeTime and isImage parameters', () => {
    const { getByTestId } = render(
      <Message
        senderId="1"
        superAdminId="1"
        content="Hello"
        avatarAdmin={IMAGES.CHAT_USER_AVATAR.url}
        avatarUser={IMAGES.CHAT_USER_AVATAR.url}
      />,
    );

    const textContent = getByTestId('image-container');
    expect(textContent).toBeInTheDocument();
  });

  it('should render avatar after the content when avatarPosition is "after"', () => {
    const { getByTestId } = render(
      <Message
        senderId="1"
        superAdminId="1"
        content="Hello"
        avatarAdmin={IMAGES.CHAT_USER_AVATAR.url}
        avatarUser={IMAGES.CHAT_USER_AVATAR.url}
        localeTime={mockLocaleTime}
      />,
    );

    const avatar = getByTestId('image-container');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle('margin-left: 2px;');
  });
});
