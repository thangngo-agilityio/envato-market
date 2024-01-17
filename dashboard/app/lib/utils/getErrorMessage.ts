import { ERROR_MESSAGES } from '@/lib/constants';
import { AxiosError } from 'axios';

type ErrorResponse = {
  message: string;
};

export const getErrorMessageFromAxiosError = <T>(
  error: AxiosError<T>,
  defaultErrorMessage?: string,
): string => {
  const { response } = error;

  if (response?.data) {
    const errorData = response.data as unknown as ErrorResponse;
    return errorData.message;
  }

  return defaultErrorMessage ?? ERROR_MESSAGES.DEFAULT_ERROR;
};
