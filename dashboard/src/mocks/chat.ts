// Constants
import { AVATAR_POSITION, IMAGES } from '@app/constants';
import { MESSAGE_TIME } from '.';

// TODO: Update later
export const MESSAGES = [
  {
    uid: '1',
    isSend: false,
    isAudio: false,
    content: 'Hi, What can i help you with?',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },
  {
    uid: '1',
    isSend: false,
    isAudio: true,
    content: 'Hi, What can i help you with?',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },

  {
    uid: '2',
    isSend: true,
    isAudio: false,
    content: 'Hello, I want to know more about your product',
    avatarPosition: AVATAR_POSITION.AFTER,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },

  {
    uid: '1',
    isSend: false,
    isAudio: false,
    content: 'Sure, I can help you with that',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },
];
