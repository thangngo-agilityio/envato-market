import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { IMAGES, AVATAR_POSITION } from '@/lib/constants';

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
        avatar={IMAGES.CHAT_USER_AVATAR.url}
        isImage
        avatarPosition={AVATAR_POSITION.BEFORE}
        isOwnerMessage
        localeTime={mockLocaleTime}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render image container when isImage is true', () => {
    const { getByTestId } = render(
      <Message
        content="Hello"
        avatar={IMAGES.CHAT_USER_AVATAR.url}
        isImage={true}
        localeTime={mockLocaleTime}
      />,
    );

    const imageContainer = getByTestId('image-container');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should render text content and current time when no input localeTime and isImage parameters', () => {
    const { getByTestId } = render(
      <Message content="Hello" avatar={IMAGES.CHAT_USER_AVATAR.url} />,
    );

    const textContent = getByTestId('text-content');
    expect(textContent).toBeInTheDocument();
  });

  it('should render avatar after the content when avatarPosition is "after"', () => {
    const { getByTestId } = render(
      <Message
        content="Hello"
        avatar={IMAGES.CHAT_USER_AVATAR.url}
        isImage={false}
        avatarPosition={AVATAR_POSITION.AFTER}
        localeTime={mockLocaleTime}
      />,
    );

    const avatar = getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle('margin-left: 2px;');
  });
});
