import { memo } from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

// Themes
import { colors } from '@/ui/themes/bases/colors';

// Utils
import { getStatusColor } from '@/lib/utils';

// Constants
import { IMAGES } from '@/lib/constants';

export type Props = {
  avatar?: string;
  name?: string;
  localeTime?: string;
  icon?: React.ReactNode;
  statusColor?: string;
  onClick?: () => void;
  lastMessages?: string;
};

const ChatMember = ({
  avatar = IMAGES.CHAT_USER_AVATAR.url,
  name = 'John Doe',
  lastMessages,
  localeTime,
  icon,
  statusColor = '',
  onClick = () => {},
}: Props) => {
  const colorFill = useColorModeValue(
    colors.secondary[200],
    colors.secondary[600],
  );

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return isMobile ? (
    <Box
      cursor="pointer"
      _hover={{ bg: colorFill }}
      onClick={onClick}
      borderRadius="lg"
    >
      <Flex justify="space-between" p={3.5}>
        <Flex gap={3} borderRadius="50%" border="1px solid">
          <Avatar src={avatar} borderRadius="50%">
            <AvatarBadge boxSize={4} bg={getStatusColor(statusColor)} top={7} />
          </Avatar>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text>{localeTime}</Text>
          {icon}
        </Flex>
      </Flex>
    </Box>
  ) : (
    <Box
      cursor="pointer"
      _hover={{ bg: colorFill }}
      onClick={onClick}
      borderRadius="lg"
    >
      <Flex justify="space-between" p={3.5}>
        <Flex gap={3}>
          <Avatar
            src={avatar}
            borderRadius="50%"
            border="1px solid"
            borderColor="border.tertiary"
          >
            <AvatarBadge boxSize={4} bg={getStatusColor(statusColor)} top={7} />
          </Avatar>
          <Flex flexDirection="column">
            <Box mr={6}>
              <Text fontSize="24px" fontWeight="bold">
                {name}
              </Text>
            </Box>
            <Text color="primary.300">{lastMessages}</Text>
          </Flex>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text>{localeTime}</Text>
          {icon}
        </Flex>
      </Flex>
    </Box>
  );
};

const ChatMemberMemorized = memo(ChatMember);

export default ChatMemberMemorized;
