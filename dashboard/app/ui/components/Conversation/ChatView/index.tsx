import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Types
import { TChat } from '@/lib/interfaces';

// Components
import Message from '../../Message';

// Mocks
import { MESSAGE_TIME } from '@/lib/mocks';

// Constants
import { IMAGES } from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

type TChatViewProps = {
  messages: TChat[];
};

const ChatView = ({ messages }: TChatViewProps): JSX.Element[] => {
  const adminAvatarURL = authStore(
    (state): string | undefined => state.user?.avatarURL,
  );

  return messages.map((messages: TChat): JSX.Element => {
    const { uid } = messages;
    const isMessageFromAdmin = uid && uid.startsWith('admin');

    const avatar = isMessageFromAdmin
      ? adminAvatarURL
      : IMAGES.CHAT_USER_AVATAR.url;

    return (
      <Message
        senderId={uid}
        key={uid}
        avatar={avatar}
        localeTime={MESSAGE_TIME}
      />
    );
  });
};

const ChatViewMemorized = memo(ChatView, isEqual);

export default ChatViewMemorized;
