import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Constants
import { IMAGES } from '@/lib/constants';

// Hooks
import { getUsers } from '@/lib/hooks';

interface MessageProps {
  content?: string;
  avatarUser?: string;
  avatarAdmin?: string;
  localeTime?: string;
  senderId: string;
}

const Message = ({
  senderId,
  content = '',
  avatarUser = IMAGES.CHAT_USER_AVATAR.url,
  avatarAdmin = IMAGES.CHAT_USER_AVATAR.url,
  localeTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  }),
}: MessageProps) => {
  // TODO: instead of USER_ID use real id
  // const userId = authStore((state) => state.user?.id);
  const [isAdmin, setIsAdmin] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      setIsAdmin(usersData?.adminId || '');
    };

    fetchData();
  }, []);

  return (
    <Flex
      width="100%"
      justifyContent={senderId !== isAdmin ? 'flex-end' : 'flex-start'}
    >
      {senderId === isAdmin && (
        <Avatar
          src={avatarAdmin}
          borderColor="border.tertiary"
          w={9}
          h={9}
          mr={2}
        />
      )}

      <Flex
        align="flex-end"
        direction={senderId !== isAdmin ? 'row-reverse' : 'row'}
        mb="30px"
        alignItems="center"
      >
        <Box
          data-testid="image-container"
          bg={
            senderId !== isAdmin
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

      {senderId !== isAdmin && (
        <Avatar
          src={avatarUser}
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
export default Message;
