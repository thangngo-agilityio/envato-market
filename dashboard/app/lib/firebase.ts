// Firebase
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

// Utils
import { db } from './utils';

// Interface
import { TMessages } from './interfaces';

export const adminSendMessage = async (
  data: TMessages,
  idRoomChat: string,
  adminId: string,
) => {
  await updateDoc(doc(db, 'chats', idRoomChat), {
    messages: arrayUnion({
      id: data.id,
      text: data.text,
      senderId: data.senderId,
      date: Timestamp.now(),
    }),
  });

  await updateDoc(doc(db, 'userChats', adminId), {
    [idRoomChat + '.lastMessage']: {
      text: data.text,
    },
    [idRoomChat + '.date']: serverTimestamp(),
  });
};
