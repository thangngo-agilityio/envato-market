import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TUserDetail } from '@/lib/interfaces';

export const userHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getAllUserDetailsExceptWithId = async (
  userId?: string | undefined,
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
    >(`${END_POINTS.USERS}/${userId}`, config)
  ).data;

  return responseListUserDetails;
};
