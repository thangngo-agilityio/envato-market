// Constants
import { AVATAR_POSITION, IMAGES } from '@/lib/constants';
import { MESSAGE_TIME } from '.';

// TODO: Update later
export const USER_CHATS = [
  {
    uid: 'user1',
    isSend: false,
    content: 'Hi, I need more information',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 1000,
  },

  {
    uid: 'user2',
    isSend: false,
    content: 'Hello, I want to know more about your product',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 3000,
  },

  {
    uid: 'user3',
    isSend: false,
    content: 'Hello, I want to know more about your product',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 6000,
  },

  {
    uid: 'admin1',
    isSend: true,
    content: 'Hi, i am here for help',
    avatarPosition: AVATAR_POSITION.AFTER,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 2000,
  },

  {
    uid: 'admin2',
    isSend: true,
    content: 'Sure, I can help you with that',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 4000,
  },
  {
    uid: 'admin3',
    isSend: true,
    content: 'Sure, I can help you with that',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME + 7000,
  },
];

export const MEMBER_CHATS = [
  { uid: 'admin', name: 'Admin' },
  { uid: 'user1', name: 'User 1' },
];

export const CONVERSATION_PROPS = {
  messages: [
    {
      date: {
        nanoseconds: 1,
        seconds: 11,
      },
      id: '1',
      senderId: '2',
      text: 'Hello',
    },
  ],
};
