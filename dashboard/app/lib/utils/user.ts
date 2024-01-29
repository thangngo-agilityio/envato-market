import dayjs from 'dayjs';

// Types
import { TEmployee, TDataSource, TUserDetail } from '@/lib/interfaces';

// Constants
import { IMAGES, TIME_FORMAT } from '@/lib/constants';

export type TShowEmployee = Omit<
  TEmployee,
  'id' | 'createdAt' | 'lastName' | 'firstName' | 'avatarURL' | 'hiringAgent'
> &
  TDataSource & {
    name: string;
    image: string;
  };

/**
 *  Convert data for table user when render in User page
 * @param users
 * @returns
 */
export const formatUserResponse = (users: TUserDetail[] = []) =>
  users.map((user) => {
    const {
      _id,
      firstName,
      lastName,
      avatarURL,
      createdAt,
      email,
      isBlock,
      uid,
    } = user;

    return {
      id: _id,
      name: `${firstName} ${lastName}`,
      image: avatarURL || IMAGES.AVATAR.url,
      email,
      createdAt: dayjs(createdAt).format(TIME_FORMAT),
      isBlock,
      uid,
    };
  });
