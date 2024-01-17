'use client';

import { memo, useCallback, useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  theme,
  useColorModeValue,
  VStack,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// themes
import { colors } from '@/ui/themes/bases/colors';

// Constants
import { AVATAR_POSITION, IMAGES } from '@/lib/constants';

// Components
import CustomButton from '@/ui/components/common/Button';
import Message from '@/ui/components/Message';
import { ChatMember } from '@/ui/components';
import { SendIconLight } from '@/ui/components/Icons';

// Interface
import { TChat } from '@/lib/interfaces';

// Mocks
import { MESSAGE_TIME, USER_CHATS } from '@/lib/mocks';

// Stores
import { authStore } from '@/lib/stores';

// Interfaces
import { MessageType } from '@/lib/interfaces/messages';
import dynamic from 'next/dynamic';

export type Props = {
  activeMember?: string;
  filteredMessages?: MessageType[];
  adminName?: string;
  onSendMessage: (message: TChat) => void;
};

const Conversation = ({ adminName }: Props) => {
  const {
    control,
    formState: {
      errors: { root },
    },
    // watch,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<TChat>({
    defaultValues: {
      messages: '',
    },
    mode: 'onBlur',
  });

  const adminAvatarURL = authStore(
    (state): string | undefined => state.user?.avatarURL,
  );

  const avatarURL = authStore(
    (state): string | undefined => state.user?.avatarURL,
  );

  const username = authStore(
    ({ user }): string | undefined => `${user?.firstName} ${user?.lastName}`,
  );

  const defaultName = adminName || username;

  const colorFill = useColorModeValue(
    theme.colors.white,
    colors.secondary[400],
  );

  // const messagesToShow = useMemo(
  //   () => (filteredMessages ?? [].length > 0 ? filteredMessages : listMessages),
  //   [filteredMessages],
  // );

  const [listMessages, setListMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : USER_CHATS;
  });

  const handleSendMessage: SubmitHandler<TChat> = useCallback(
    (event) => {
      const newMessageContent = event.messages;

      const newMessage = {
        messages: newMessageContent,
        uid: 'admin',
        isSend: false,
        content: newMessageContent,
        avatarPosition: AVATAR_POSITION.AFTER,
        avatar: IMAGES.CHAT_USER_AVATAR.url,
        localeTime: MESSAGE_TIME + 5000,
      };

      const updatedMessages = [...listMessages, newMessage];
      setListMessages(updatedMessages);

      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

      reset();
    },
    [listMessages, reset],
  );

  const handleClearErrorMessage = useCallback(
    (field: keyof TChat, onChange: (value: string) => void) =>
      (data: string) => {
        clearErrors(field);
        onChange(data);
      },
    [clearErrors],
  );

  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(handleSendMessage)();
      }
    },
    [handleSendMessage, handleSubmit],
  );

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
        {listMessages?.map((messages: TChat): JSX.Element => {
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
        })}
        <VStack as="form" onSubmit={handleSubmit(handleSendMessage)}>
          <Flex direction="column" width="full">
            <Controller
              control={control}
              name="messages"
              render={({ field: { onChange, ...rest } }) => (
                <FormControl>
                  <Flex
                    direction="row"
                    alignItems="center"
                    justify="flex-start"
                  >
                    <ReactQuill
                      {...rest}
                      onKeyDown={handleOnKeyDown}
                      onChange={handleClearErrorMessage('messages', onChange)}
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline'],
                          ['image', 'code-block'],
                        ],
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: colorFill,
                      }}
                      theme="snow"
                    />
                  </Flex>
                </FormControl>
              )}
            />

            <Text color="red" textAlign="center" py={2} h={10}>
              {root?.message}
            </Text>

            <CustomButton
              w="unset"
              px={4}
              py={2.5}
              leftIcon={<SendIconLight />}
              fontSize="md"
              fontWeight="semibold"
              bgColor="primary.600"
              mt={4}
              alignSelf="flex-end"
              type="submit"
            >
              Send
            </CustomButton>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

const ConversationMemorized = memo(Conversation);

export default ConversationMemorized;
