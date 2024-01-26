import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { memo } from 'react';

// Constants
import { IMAGES } from '@/lib/constants';

interface MessageProps {
  content?: string;
  avatarUser?: string;
  avatarAdmin?: string;
  localeTime?: string;
  senderId: string;
  isSuperAdmin: boolean;
}

const MessageAdmin = ({
  content = '',
  isSuperAdmin = false,
  avatarUser = IMAGES.CHAT_USER_AVATAR.url,
  avatarAdmin = IMAGES.CHAT_USER_AVATAR.url,
  localeTime,
}: MessageProps) => {
  const justifyContent = isSuperAdmin ? 'flex-end' : 'flex-start';
  const direction = isSuperAdmin ? 'row-reverse' : 'row';
  const background = isSuperAdmin
    ? 'primary.300'
    : 'background.section.messageUser';

  return (
    <Flex
      width="100%"
      justifyContent={justifyContent}
      alignItems="center"
      mb="25px"
    >
      {!isSuperAdmin && (
        <Avatar
          src={avatarUser}
          border="1px solid"
          borderColor="border.tertiary"
          w={9}
          h={9}
          mr={2}
        />
      )}

      <Flex align="flex-end" direction={direction} alignItems="center">
        <Box
          data-testid="image-container"
          bg={background}
          p={3}
          ml={2}
          borderRadius={8}
          color="text.primary"
          dangerouslySetInnerHTML={{ __html: content ?? '' }}
        />
        <Spacer />

        <Text
          ml={3}
          mr={3}
          fontSize="xs"
          color="text.textTime"
          fontWeight="medium"
          minW="max-content"
        >
          {localeTime}
        </Text>
      </Flex>

      {isSuperAdmin && (
        <Avatar
          src={avatarAdmin}
          border="1px solid"
          borderColor="border.tertiary"
          w={9}
          h={9}
          ml={2}
          data-testid="avatar"
        />
      )}
    </Flex>
  );
};
const MessagesMemorized = memo(MessageAdmin);

export default MessagesMemorized;
