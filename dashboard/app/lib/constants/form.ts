import { ERROR_MESSAGES } from './messages';
import { REGEX } from './regex';

export const AUTH_SCHEMA = {
  FIRST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('First Name'),
  },
  LAST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Last Name'),
  },
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.EMAIL_INVALID,
    },
  },
  PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
  },
  CONFIRM_PASSWORD: {
    // TODO: Update validate confirm password later
    validate: (val: string, { password }: { password: string }) => {
      if (password && !val) {
        return ERROR_MESSAGES.FIELD_REQUIRED('Confirm password');
      }
      if (password && val !== password) {
        return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
      }
    },
  },
  REMEMBER_ME: {
    required: false,
  },
  AGREE_POLICY: {
    //TODO: Refactor later
    validate: (
      value: boolean,
      //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      { isAcceptPrivacyPolicy: __, ...fieldValues }: any,
    ) => Object.values(fieldValues).every((value) => value) && value,
  },

  PHONE_NUMBER: {
    pattern: {
      value: REGEX.PHONE_NUMBER,
      message: ERROR_MESSAGES.PHONE_NUMBER_INVALID,
    },
  },

  AVATAR_URL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Avatar'),
    pattern: {
      value: REGEX.IMG,
      message: ERROR_MESSAGES.UPLOAD_IMAGE,
    },
  },

  FACEBOOK: {
    pattern: {
      value: REGEX.FACEBOOK,
      message: ERROR_MESSAGES.FACEBOOK_INVALID,
    },
  },

  TWITTER: {
    pattern: {
      value: REGEX.TWITTER,
      message: ERROR_MESSAGES.TWITTER_INVALID,
    },
  },

  LINKEDIN: {
    pattern: {
      value: REGEX.LINKEDIN,
      message: ERROR_MESSAGES.LINKEDIN_INVALID,
    },
  },

  YOUTUBE: {
    pattern: {
      value: REGEX.YOUTUBE,
      message: ERROR_MESSAGES.YOUTUBE_INVALID,
    },
  },
};
