import { defineStyleConfig } from '@chakra-ui/react';

const PRIMARY_BG_COLOR = 'background.component.select.primary';
const SECONDARY_BG_COLOR = 'background.component.select.primary';
const NO_COLOR = 'background.component.select.secondary';
const NO_BG = 'background.component.select.noBackground';

const BORDER_STYLES = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'border.primary',
};

export const SIZES = {
  sm: {
    px: 3,
  },
  md: {
    px: 5,
  },
};

export const Select = defineStyleConfig({
  sizes: {
    sm: {
      button: SIZES.sm,
    },
    md: {
      button: SIZES.md,
    },
  },
  variants: {
    primary: {
      button: {
        bgColor: SECONDARY_BG_COLOR,
        ...BORDER_STYLES,
        _hover: {
          background: SECONDARY_BG_COLOR,
          ...BORDER_STYLES,
        },
        _active: {
          background: SECONDARY_BG_COLOR,
        },
        _dark: {
          border: 'none',
        },
      },
    },
    secondary: {
      button: {
        bgColor: NO_COLOR,
        ...BORDER_STYLES,
        _hover: {
          background: NO_COLOR,
          ...BORDER_STYLES,
        },
        _active: {
          background: NO_COLOR,
        },
      },
    },
    'no-border': {
      button: {
        bgColor: PRIMARY_BG_COLOR,

        _hover: {
          background: PRIMARY_BG_COLOR,
        },
        _active: {
          background: PRIMARY_BG_COLOR,
        },
      },
    },
    'no-background': {
      button: {
        bgColor: NO_BG,

        _hover: {
          background: NO_BG,
        },
        _active: {
          background: NO_BG,
        },
      },
    },
  },
});
