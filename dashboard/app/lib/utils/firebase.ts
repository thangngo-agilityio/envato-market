import { db } from '@/firebase';
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { TMessages } from '../interfaces';

export const sendMessage = async (
  data: TMessages,
  idRoomChat: string,
  senderId: string,
  adminId: string,
  avatarUrl: string,
  avatarAdminUrl: string,
  displayName: string,
) => {
  // Update 'chats' document with the new message
  await updateDoc(doc(db, 'chats', idRoomChat), {
    messages: arrayUnion({
      id: data.id,
      text: data.text,
      senderId: data.senderId,
      date: Timestamp.now(),
    }),
  });

  onSnapshot(doc(db, 'userChats', adminId), (doc) => {
    if (!doc.exists()) {
      createUserChat(
        senderId,
        idRoomChat,
        data.text,
        avatarUrl,
        avatarAdminUrl,
        displayName,
      );
    }
  });

  await updateDoc(doc(db, 'userChats', adminId), {
    [idRoomChat]: {
      lastMessage: {
        text: data.text,
      },
      date: serverTimestamp(),
      userInfo: {
        uid: senderId,
        avatarUrl,
        avatarAdminUrl,
        displayName,
      },
    },
  });
};

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

const createUserChat = async (
  senderId: string,
  idRoomChat: string,
  text: string,
  avatarUrl: string,
  avatarAdminUrl: string,
  displayName: string,
) => {
  setDoc(doc(db, 'userChats', senderId), {
    [idRoomChat]: {
      lastMessage: text,
      date: serverTimestamp(),
      userInfo: {
        uid: senderId,
        avatarUrl,
        avatarAdminUrl,
        displayName,
      },
    },
  });
};
