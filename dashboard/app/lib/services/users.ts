import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TUserDetail } from '@/lib/interfaces';

export const userHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getAllUserDetailsExceptWithId = async (
  userId = '',
  searchParam = '',
  config?: IAxiosConfig,
): Promise<
  Array<
    Omit<TUserDetail, 'id'> & {
      _id: string;
    }
  >
> => {
  const responseListUserDetails = (
    await userHttpRequest.get<
      Array<
        Omit<TUserDetail, 'id'> & {
          _id: string;
        }
      >
    >(`${END_POINTS.USERS}/${userId}${searchParam || ''}`, config)
  ).data;

  return responseListUserDetails;
};

export const getAdminDetailsWithId = async (
  userId = '',
  config?: IAxiosConfig,
): Promise<
  Omit<TUserDetail, 'id'> & {
    _id: string;
  }
> => {
  const responseAdminDetails = (
    await userHttpRequest.get<
      Omit<TUserDetail, 'id'> & {
        _id: string;
      }
    >(`${END_POINTS.ADMIN}/${userId}`, config)
  ).data;

  return responseAdminDetails;
};
