import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';

// Constants
import { IMAGES } from '@/lib/constants';
import { USER_ID } from '@/lib/mocks/id';

interface MessageProps {
  content?: string;
  avatar?: string;
  localeTime?: string;
  senderId: string;
}

const Message = ({
  senderId,
  content = '',
  avatar = IMAGES.CHAT_USER_AVATAR.url,
  localeTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  }),
}: MessageProps) => (
  // TODO: instead of USER_ID use real id
  // const userId = authStore((state) => state.user?.id);

  <Flex
    width="100%"
    justifyContent={senderId !== USER_ID ? 'flex-end' : 'flex-start'}
  >
    {senderId === USER_ID && (
      <Avatar src={avatar} borderColor="border.tertiary" w={9} h={9} mr={2} />
    )}
    <Flex
      align="flex-end"
      direction={senderId !== USER_ID ? 'row-reverse' : 'row'}
      mb="30px"
      alignItems="center"
    >
      <Box
        data-testid="image-container"
        bg={
          senderId !== USER_ID
            ? 'primary.300'
            : 'background.section.messageUser'
        }
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
    {senderId !== USER_ID && (
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
