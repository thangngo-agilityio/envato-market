// Libs
import { extendTheme } from '@chakra-ui/react';

// Bases
import { fonts } from './bases';

// Components
import { Spinner } from './components';

export const configThemes = {
  ...extendTheme({
    semanticTokens: {
      fonts,
    },
    components: {
      Spinner,
    },
  }),

  styles: {
    global: {
      'html, body': {
        fontFamily: 'primary',
      },
    },
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
};
