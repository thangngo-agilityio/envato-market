import { AxiosError } from 'axios';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

// Utils
import { getErrorMessageFromAxiosError } from '@/lib/utils';

type ErrorResponse = {
  message: string;
};

describe('getErrorMessageFromAxiosError function', () => {
  it('should return the error message from AxiosError response data', () => {
    const axiosError = {
      response: {
        data: {
          message: 'Test Error Message',
        },
      },
    };

    const result = getErrorMessageFromAxiosError(
      axiosError as AxiosError<ErrorResponse>,
    );

    expect(result).toBe('Test Error Message');
  });

  it('should return the default error message if no response data is available', () => {
    const axiosError: AxiosError<ErrorResponse> = {
      isAxiosError: false,
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      name: '',
      message: '',
    };

    const result = getErrorMessageFromAxiosError(
      axiosError,
      'Default Test Error Message',
    );

    expect(result).toBe('Default Test Error Message');
  });

  it('should return the default error message if response is undefined', () => {
    const axiosError: AxiosError<ErrorResponse> = {
      isAxiosError: false,
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      name: '',
      message: '',
    };

    const result = getErrorMessageFromAxiosError(
      axiosError,
      'Default Test Error Message',
    );

    expect(result).toBe('Default Test Error Message');
  });

  it('should return the default error message if no default error message is provided', () => {
    const axiosError: AxiosError<ErrorResponse> = {
      isAxiosError: false,
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      name: '',
      message: '',
    };

    const result = getErrorMessageFromAxiosError(axiosError);

    expect(result).toBe(ERROR_MESSAGES.DEFAULT_ERROR);
  });
});
