'use client';

import { Suspense, memo, useCallback, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import 'react-quill/dist/quill.snow.css';

// Constants
import { AVATAR_POSITION, IMAGES, STORE_KEY } from '@/lib/constants';

// Components
import { ChatMember } from '@/ui/components';
const ChatArea = dynamic(() => import('./ChatArea'));
const ChatView = dynamic(() => import('./ChatView'));

// Interface
import { TChat } from '@/lib/interfaces';

// Mocks
import { MESSAGE_TIME, USER_CHATS } from '@/lib/mocks';

// Stores
import { authStore } from '@/lib/stores';

// Interfaces
import { MessageType } from '@/lib/interfaces/messages';

export type Props = {
  activeMember?: string;
  filteredMessages?: MessageType[];
  adminName?: string;
  onSendMessage: (message: TChat) => void;
};

const Conversation = ({ adminName }: Props) => {
  const avatarURL = authStore(
    (state): string | undefined => state.user?.avatarURL,
  );

  const username = authStore(
    ({ user }): string | undefined => `${user?.firstName} ${user?.lastName}`,
  );

  const defaultName = adminName ?? username;

  const [listMessages, setListMessages] = useState(() => {
    const storedMessages = localStorage.getItem(STORE_KEY.CHAT);
    return storedMessages ? JSON.parse(storedMessages) : USER_CHATS;
  });

  const handleSendMessage = useCallback((chat: TChat) => {
    const message: string = chat.messages.trim();

    const newMessage = {
      messages: message,
      uid: 'admin',
      isSend: false,
      content: message,
      avatarPosition: AVATAR_POSITION.AFTER,
      avatar: IMAGES.CHAT_USER_AVATAR.url,
      localeTime: MESSAGE_TIME + 5000,
    };

    setListMessages((prev: TChat[]) => {
      const messages: TChat[] = [...prev, newMessage];

      localStorage.setItem(STORE_KEY.CHAT, JSON.stringify(messages));

      return messages;
    });
  }, []);

  return (
    <Box w="full" borderRadius="lg">
      <Flex
        direction="row"
        justifyContent="space-between"
        padding={{ base: '8px', lg: '24px 26px' }}
        bg="background.body.septenary"
      >
        <Heading
          as="h3"
          fontWeight="semibold"
          color="text.primary"
          fontSize="2xl"
          textTransform="capitalize"
        >
          <ChatMember
            avatar={avatarURL}
            name={defaultName}
            statusColor="online"
          />
        </Heading>
      </Flex>

      <Box padding={{ base: '24px 20px', lg: '38px 35px' }}>
        <Suspense>
          <ChatView messages={listMessages} />
          <ChatArea onSendMessage={handleSendMessage} />
        </Suspense>
      </Box>
    </Box>
  );
};

const ConversationMemorized = memo(Conversation);

export default ConversationMemorized;
