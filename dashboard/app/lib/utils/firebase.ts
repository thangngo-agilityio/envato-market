import {
  Timestamp,
  arrayUnion,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { TMessages } from '../interfaces';
import { Messaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CHAT, USER_CHATS_FIELD } from '../constants';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID;

export const requestForToken = async (messaging: Messaging) => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      return currentToken;
      // Perform any other neccessary action with the token
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.',
      );
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();

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
  await updateDoc(doc(db, FIREBASE_CHAT.CHATS, idRoomChat), {
    messages: arrayUnion({
      id: data.id,
      text: data.text,
      senderId: data.senderId,
      date: Timestamp.now(),
    }),
  });

  onSnapshot(doc(db, FIREBASE_CHAT.USER_CHATS, adminId), (doc) => {
    if (!doc.exists()) {
      createUserChat(
        adminId,
        senderId,
        idRoomChat,
        data.text,
        avatarUrl,
        avatarAdminUrl,
        displayName,
      );
    }
  });

  await updateDoc(doc(db, FIREBASE_CHAT.USER_CHATS, adminId), {
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

const createUserChat = async (
  adminId: string,
  senderId: string,
  idRoomChat: string,
  text: string,
  avatarUrl: string,
  avatarAdminUrl: string,
  displayName: string,
) => {
  setDoc(doc(db, FIREBASE_CHAT.USER_CHATS, adminId), {
    [idRoomChat]: {
      lastMessage: {
        text: text,
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
