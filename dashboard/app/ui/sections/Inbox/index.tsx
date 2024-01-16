'use client';

import {
  Text,
  Flex,
  theme,
  useColorModeValue,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';

// Components
import { EditIcon } from '@/ui/components/Icons';
import { ChatMember, Conversation } from '@/ui/components';

// Mocks
import { MEMBER_CHATS, USER_CHATS } from '@/lib/mocks';
import { MEMBER_CHAT } from '@/lib/mocks/member';

// Interfaces
import { MessageType } from '@/lib/interfaces/messages';

const ChatMemberList = () => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [activeMember, setActiveMember] = useState<string>('');
  const [filteredMessages, setFilteredMessages] = useState<MessageType[]>([]);
  const [initialized, setInitialized] = useState(false);

  const handleMemberClick = (memberId: string) => {
    setActiveMember(memberId);
    filterMessages(memberId);
  };

  const filterMessages = (memberId: string) => {
    const filtered = USER_CHATS.filter(
      (message) => message.uid === 'admin' || message.uid === memberId,
    );
    setFilteredMessages(filtered);
  };

  const initializeChat = () => {
    const defaultMember = MEMBER_CHATS[1]?.uid;
    filterMessages(defaultMember || '');
    setInitialized(true);
  };

  if (!initialized) {
    initializeChat();
  }

  return (
    <Grid
      templateColumns="repeat(12, minmax(0, 1fr))"
      borderTop="1px solid"
      borderColor="border.tertiary"
    >
      {isMobile ? (
        <GridItem
          colSpan={12}
          mb={4}
          padding={2}
          bg="background.body.septenary"
        >
          <Flex justify="flex-start">
            {MEMBER_CHAT.map(({ id, avatar, statusColor }) => (
              <ChatMember
                key={id}
                avatar={avatar}
                statusColor={statusColor}
                onClick={() => handleMemberClick(id)}
              />
            ))}
          </Flex>
        </GridItem>
      ) : (
        <GridItem
          colSpan={4}
          bg="background.body.septenary"
          pt={6}
          pr={7}
          pl={12}
          pb={10}
          borderRight="1px solid"
          borderColor="border.tertiary"
        >
          <Flex justify="space-between" align="center">
            <Text
              as="h3"
              color="text.primary"
              fontWeight="semibold"
              fontSize="3xl"
            >
              Messages
              <Text
                as="span"
                color="text.primary"
                fontWeight="semibold"
                fontSize="3xl"
              >
                ({MEMBER_CHAT.length})
              </Text>
            </Text>

            <EditIcon color={colorFill} />
          </Flex>
          <Flex direction="column" gap={6} py={3.5}>
            {MEMBER_CHAT.map(
              ({ id, avatar, name, icon, localeTime, statusColor }) => (
                <ChatMember
                  key={id}
                  avatar={avatar}
                  name={name}
                  icon={icon}
                  localeTime={localeTime}
                  statusColor={statusColor}
                  onClick={() => handleMemberClick(id)}
                />
              ),
            )}
          </Flex>
        </GridItem>
      )}
      <GridItem colSpan={isMobile ? 12 : 8}>
        <Conversation
          activeMember={activeMember}
          filteredMessages={filteredMessages}
          onSendMessage={() => null}
        />
      </GridItem>
    </Grid>
  );
};

export default ChatMemberList;
