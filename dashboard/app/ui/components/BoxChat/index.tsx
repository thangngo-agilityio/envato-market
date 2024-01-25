'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';

// Components
import Message from './Message';

// Components
import { InputSendMessages } from '@/ui/components';

// Interface
import { TMessages } from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

// Hooks
import { getCurrentUser } from '@/lib/hooks';

// Firebase
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/utils';
import { FIREBASE_CHAT, USER_CHATS_FIELD } from '@/lib/constants';

const initialUserChat = {
  roomChatId: '',
  userId: '',
  adminId: '',
  avatarUrl: '',
  avatarAdminUrl: '',
  displayName: '',
};

const BoxChatComponent = () => {
  const [messages, setMessages] = useState<TMessages[]>([]);
  const user = authStore((state) => state.user);
  const [userChat, setUserChat] = useState(initialUserChat);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const createChatRoom = useCallback(async () => {
    // Get user data
    const usersData = await getCurrentUser(user);

    if (usersData) {
      await setDoc(doc(db, FIREBASE_CHAT.CHATS, usersData.roomChatId), {
        messages: [],
      });

      await updateDoc(doc(db, FIREBASE_CHAT.USER_CHATS, usersData.adminId), {
        [usersData.roomChatId + USER_CHATS_FIELD.USER_INFO]: {
          uid: usersData.adminId,
          displayName: usersData.displayName,
          photoURL: usersData.avatarUrl,
        },
        [usersData.roomChatId + USER_CHATS_FIELD.DATE]: serverTimestamp(),
      });

      await updateDoc(doc(db, FIREBASE_CHAT.USER_CHATS, usersData.userId), {
        [usersData.roomChatId + USER_CHATS_FIELD.USER_INFO]: {
          uid: usersData.userId,
          displayName: usersData.displayName,
          photoURL: usersData.avatarUrl,
        },
        [usersData.roomChatId + USER_CHATS_FIELD.DATE]: serverTimestamp(),
      });
    }
  }, [user]);

  const fetchData = async () => {
    // Get user data
    const usersData = await getCurrentUser(user);

    // Check if usersData is undefined before accessing its properties
    if (usersData) {
      const res = await getDoc(
        doc(db, FIREBASE_CHAT.CHATS, usersData.roomChatId),
      );

      setUserChat(usersData);
      if (res.exists()) {
        setMessages(res.data().messages);
      } else {
        await createChatRoom();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!userChat.roomChatId) return;
    const unSub = onSnapshot(
      doc(db, FIREBASE_CHAT.CHATS, userChat.roomChatId),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      },
    );

    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }

    return () => {
      unSub();
    };
  }, [userChat.roomChatId]);

  return (
    <Box w="full" bg="background.body.quaternary" borderRadius="lg">
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        justify="center"
        borderBottom="1px solid"
        borderBottomColor="border.tertiary"
        padding="24px 26px"
      >
        <Heading
          as="h3"
          fontWeight="semibold"
          color="text.primary"
          fontSize="2xl"
          textTransform="capitalize"
        >
          team chat
        </Heading>
      </Flex>

      <Box padding={{ base: '24px 20px', lg: '45px 35px' }}>
        <Box
          ref={boxRef}
          overflowX="auto"
          overflowY="scroll"
          css={{
            '&::-webkit-scrollbar': {
              width: 2,
            },
            '&::-webkit-scrollbar-track': {
              width: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '24px',
            },
          }}
          maxHeight={361}
          padding={5}
        >
          {messages.map((m) => (
            <Message
              content={m.text}
              key={m.date.second}
              senderId={m.senderId}
              avatarAdmin={userChat.avatarAdminUrl}
              avatarUser={userChat.avatarUrl}
            />
          ))}
        </Box>
        <InputSendMessages boxRef={boxRef} />
      </Box>
    </Box>
  );
};

const BoxChat = memo(BoxChatComponent);

export default BoxChat;
