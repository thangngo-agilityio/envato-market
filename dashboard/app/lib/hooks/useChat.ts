import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

// Stores
import { authStore } from '@/lib/stores';

// Interface
import { TUserInfo, useGetUserDetails } from '.';
import { TMessages } from '@/lib/interfaces';

// Firebase
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

// Services
import { getAllUserDetailsExceptWithId } from '@/lib/services';

// Constants
import { AUTHENTICATION_ROLE, FIREBASE_CHAT } from '@/lib/constants';

// Utils
import { db } from '@/lib/utils';

// TODO: if have real id from firestore
export const useGetRoomChat = () => {
  const user = authStore((state) => state.user);
  const { filterDataUser } = useGetUserDetails(user?.id || '');

  const isAdmin = filterDataUser?.find(
    (user) => user.role === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  const adminUserId = isAdmin?._id;
  const comBindIdChat = `${user?.id || ''}${adminUserId}`;
  return comBindIdChat;
};

// Author: Loc Vo
export const getCurrentUser = async (user: TUserInfo) => {
  const userList = await getAllUserDetailsExceptWithId(user?.id);

  const adminInfo = userList.find(
    (userItem) => userItem.role === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  if (adminInfo) {
    const adminUid = adminInfo?.uid;
    const userUid = user?.uid;
    return {
      roomChatId: `${adminUid}${userUid}`,
      userId: userUid || '',
      adminId: adminUid || '',
      avatarUrl: user?.avatarURL || '',
      avatarAdminUrl: adminInfo?.avatarURL || '',
      displayName: `${user?.firstName} ${user?.lastName} `,
    };
  }
};

export const getUserList = async (user: TUserInfo) => {
  const userList = await getAllUserDetailsExceptWithId(user?.id);

  return userList;
};

// Get user from database
export const getUsers = async () => {
  const usersCollection = collection(db, FIREBASE_CHAT.USERS);
  const usersSnapshot = await getDocs(usersCollection);

  const userList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const admin = userList.find(
    (user) => user.data.displayName === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  if (admin) {
    const isAdmin = admin.data.uid;
    const isMember = userList[8]?.id;
    return {
      roomChatId: isAdmin + isMember,
      userId: isMember,
      adminId: isAdmin,
      listUserDetail: userList,
    };
  }
};

export const getLists = async () => {
  const usersCollection = collection(db, FIREBASE_CHAT.USER_CHATS);
  const usersSnapshot = await getDocs(usersCollection);

  const chatList = usersSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
    .map((item) => Object.values(item.data)[0]) as [];

  return {
    chatList,
  };
};

export const useSubscribeToChat = (
  roomId: string,
  setMessages: Dispatch<SetStateAction<TMessages[]>>,
  boxRef?: MutableRefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    if (!roomId) return;

    const unSub = onSnapshot(
      doc(db, FIREBASE_CHAT.CHATS, roomId),
      async (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      },
    );

    if (boxRef?.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }

    return () => {
      unSub();
    };
  }, [setMessages, roomId, boxRef]);
};
