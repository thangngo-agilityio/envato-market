import { UseToastOptions } from '@chakra-ui/react';
import { SHOW_TIME, STATUS } from '../constants';

// Constants

export const customToast = (
  title?: string,
  description?: string,
  status?: STATUS,
) =>
  ({
    title: title,
    description: description,
    status: status,
    duration: SHOW_TIME,
    isClosable: true,
    position: 'top-right',
  }) as UseToastOptions;
