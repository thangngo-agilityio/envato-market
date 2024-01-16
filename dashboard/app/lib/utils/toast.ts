import { UseToastOptions } from '@chakra-ui/react';

// Constants
import { SHOW_TIME, STATUS } from '../constants';

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
