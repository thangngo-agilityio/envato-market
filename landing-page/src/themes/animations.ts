import type { Config } from 'tailwindcss';

export const keyframes: Config['theme'] = {
  keyframes: {
    grow: {
      to: { height: '300px', overflow: 'visitable' },
    },
    shrink: {
      from: { height: '300px', overflow: 'visitable' },
      to: { height: '0', overflow: 'hidden' },
    },
  },
};

export const animation: Config['theme'] = {
  animation: {
    grow: 'grow .3s linear forwards',
    shrink: 'shrink .3s linear forwards',
  },
};
