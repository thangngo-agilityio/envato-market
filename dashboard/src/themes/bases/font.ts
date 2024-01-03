import { Urbanist, Poppins } from 'next/font/google';

const urbanist = Urbanist({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-urbanist',
});

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const fontFamilies = {
  urbanist,
  poppins,
};

export const fonts = {
  primary: 'var(--font-urbanist)',
  secondary: 'var(--font-poppins)',
};
