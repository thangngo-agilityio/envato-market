import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';

// Components
import VoiceChatMessage from './VoiceChatMessage';

// Constants
import { AVATAR_POSITION } from '@/lib/constants';

interface MessageProps {
  content?: string;
  avatar?: string;
  isImage?: boolean;
  avatarPosition?: AVATAR_POSITION;
  isOwnerMessage?: boolean;
  localeTime?: string;
}

const Message = ({
  content,
  avatar,
  avatarPosition = AVATAR_POSITION.BEFORE,
  isImage = false,
  isOwnerMessage = false,
  localeTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  }),
}: MessageProps) => (
  <Flex>
    {avatarPosition === AVATAR_POSITION.BEFORE && (
      <Avatar src={avatar} borderColor="border.tertiary" w={9} h={9} mr={2} />
    )}

    <Flex
      align="flex-end"
      direction={isOwnerMessage ? 'row-reverse' : 'row'}
      mb="30px"
    >
      <Box data-testid="image-container">
        {isImage ? (
          <VoiceChatMessage />
        ) : (
          <Text
            bg="background.component.secondary"
            p={3}
            ml={2}
            borderRadius={8}
            color="text.primary"
            data-testid="text-content"
          >
            {content}
          </Text>
        )}
      </Box>
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

    {avatarPosition === AVATAR_POSITION.AFTER && (
      <Avatar
        src={avatar}
        borderColor="border.tertiary"
        w={9}
        h={9}
        ml={2}
        data-testid="avatar"
      />
    )}
  </Flex>
);

export default Message;
