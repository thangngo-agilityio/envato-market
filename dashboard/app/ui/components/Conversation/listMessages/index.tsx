import { useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

// Components
import { MessageAdmin, Quill } from '../..';

// store
import { authStore } from '@/lib/stores';

// Interface
import { TMessages } from '@/lib/interfaces';

export type Props = {
  messages: TMessages[];
  adminUid?: string;
  avatarUser?: string;
};

const ListMessages = ({ messages, adminUid, avatarUser }: Props) => {
  const user = authStore((state) => state.user);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    boxRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <Box padding={{ base: '24px 20px', lg: '38px 35px' }}>
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
          <MessageAdmin
            content={m.text}
            key={m.date.second}
            senderId={m.senderId}
            isSuperAdmin={m.senderId === user?.uid}
            avatarUser={avatarUser}
            avatarAdmin={user?.avatarURL}
          />
        ))}
      </Box>
      <Quill userUid={adminUid} />
    </Box>
  );
};

export default ListMessages;
