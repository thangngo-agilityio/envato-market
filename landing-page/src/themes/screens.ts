import type { Config } from 'tailwindcss';

export const screens: Config['theme'] = {
  screens: {
    xs: '320px',
    sm: '576px',
    nearLg: '992px',
    nearXl: '1200px',
  },
};

export const container: Config['theme'] = {
  container: {
    screens: {
      xs: '100%',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1140px',
    },
  },
};
