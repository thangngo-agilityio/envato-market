// Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils';

// Interface
import { TUserInfo } from '../stores';

// Services
import { getAllUserDetailsExceptWithId } from '../services';

export const getUserList = async (user: TUserInfo) => {
  const userList = await getAllUserDetailsExceptWithId(user?.id);

  return userList;
};

// Get user from database
export const getUsers = async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);

  const userList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const admin = userList.find(
    (user) => user.data.displayName === 'Super Admin',
  );

  if (admin) {
    const isAdmin = admin.data.uid;
    const isMember = userList[8].id;
    return {
      roomChatId: isAdmin + isMember,
      userId: isMember,
      adminId: isAdmin,
      listUserDetail: userList,
    };
  }
};
