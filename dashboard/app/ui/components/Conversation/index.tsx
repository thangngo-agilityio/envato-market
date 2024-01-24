import { memo } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';

// Components
import { ChatMember, ListMessages } from '..';

// Interface
import { TMessages } from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

// Interfaces
import { MessageType } from '@/lib/interfaces/messages';

export type Props = {
  adminUid?: string;
  filteredMessages?: MessageType[];
  adminName?: string;
  avatarUser?: string;
  messages: TMessages[];
};

const Conversation = ({ adminName, avatarUser, messages, adminUid }: Props) => {
  const avatarURL = authStore(
    (state): string | undefined => state.user?.avatarURL,
  );

  const username = authStore(
    ({ user }): string | undefined => `${user?.firstName} ${user?.lastName}`,
  );

  const defaultName = adminName || username;
  const defaultAvatar = avatarUser || avatarURL;

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
            avatar={defaultAvatar}
            name={defaultName}
            statusColor="online"
          />
        </Heading>
      </Flex>

      <ListMessages
        avatarUser={defaultAvatar}
        messages={messages}
        adminUid={adminUid}
      />
    </Box>
  );
};

const ConversationMemorized = memo(Conversation);

export default ConversationMemorized;
