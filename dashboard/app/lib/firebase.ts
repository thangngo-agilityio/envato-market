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
import { FIREBASE_CHAT, USER_CHATS_FIELD } from './constants';

export const adminSendMessage = async (
  data: TMessages,
  idRoomChat: string,
  adminId: string,
) => {
  await updateDoc(doc(db, FIREBASE_CHAT.CHATS, idRoomChat), {
    messages: arrayUnion({
      id: data.id,
      text: data.text,
      senderId: data.senderId,
      date: Timestamp.now(),
    }),
  });

  await updateDoc(doc(db, FIREBASE_CHAT.USER_CHATS, adminId), {
    [idRoomChat + USER_CHATS_FIELD.LAST_MESSAGE]: {
      text: data.text,
    },
    [idRoomChat + USER_CHATS_FIELD.DATE]: serverTimestamp(),
  });
};
