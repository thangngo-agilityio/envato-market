import { AVATAR_POSITION, IMAGES } from '../constants';

export const MESSAGE_TIME = new Date(1702543868252).toLocaleTimeString([], {
  hour: 'numeric',
  minute: '2-digit',
});

export const MESSAGE_TIME_FORMAT = new Date().toLocaleTimeString([], {
  hour: 'numeric',
  minute: '2-digit',
  hour12: false,
});

export const MOCK_CURRENT_TIME = new Date(1702543868252);

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
    uid: '2',
    isSend: false,
    isAudio: true,
    content: 'Hi, What can i help you with?',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },

  {
    uid: '3',
    isSend: true,
    isAudio: false,
    content: 'Hello, I want to know more about your product',
    avatarPosition: AVATAR_POSITION.AFTER,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },

  {
    uid: '4',
    isSend: false,
    isAudio: false,
    content: 'Sure, I can help you with that',
    avatarPosition: AVATAR_POSITION.BEFORE,
    avatar: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: MESSAGE_TIME,
  },
];
