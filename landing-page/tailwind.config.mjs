import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screen: {
        xs: '320px',
        // => @media (min-width: 375px) { ... }
      },
      fontFamily: {
        primary: ['Helvetica', 'sans-serif'],
      },
      lineHeight: {
        xs: '13px',
        sm: '18px',
        base: '21px',
        md: '23px',
        lg: '26px',
        xl: '30px',
        huge: '31px',
        big: '39px',
        giant: '47px',
      },
      colors: {
        primary: '#242424',
        secondary: '#131212',
        elementary: '#6b6b6b',
        average: '#252525',
        sparingly: '#6d6d6d',
        little: '#b3b1b1',
        once: '#212529',
        onceAll: '#6c757d',
        sun: '#fbb710',
        iridium: '#3c3c3c',
        'desert-storm': '#f5f7fa',
        few: '#3c3c3cb3',
        'info-rgba': 'rgba(0,123,255,.25)',
        'dark-rgba': 'rgba(255, 255, 255, 0.4)',
      },
      boxShadow: {
        sm: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
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
      spacing: {
        md: '15px',
        lg: '30px',
        xl: '50px',
        '2xl': '60px',
        '3xl': '100px',
        '4xl': '386px',
      },
      keyframes: {
        grow: {
          to: { height: '300px', overflow: 'visitable' },
        },
        shrink: {
          from: { height: '300px', overflow: 'visitable' },
          to: { height: '0', overflow: 'hidden' },
        },
      },
      animation: {
        grow: 'grow .3s linear forwards',
        shrink: 'shrink .3s linear forwards',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        '@font-face': {
          fontFamily: 'Helvetica',
          fontWeight: '400',
          src: 'url(/assets/fonts/HelveticaNeueRoman.woff2)',
          fontDisplay: 'swap',
        },
        '*, input': {
          fontFamily: theme('fontFamily.primary'),
          fontWeight: theme('fontWeight.normal'),
        },
      });
    }),
  ],
};
