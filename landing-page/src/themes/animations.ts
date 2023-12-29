import type { Config } from 'tailwindcss';

export const keyframes: Config['theme'] = {
  keyframes: {
    grow: {
      to: { height: '135px', overflow: 'visitable' },
    },
    shrink: {
      from: { height: '135px', overflow: 'visitable' },
      to: { height: '0px', overflow: 'hidden' },
    },
  },
};

export const animation: Config['theme'] = {
  animation: {
    grow: 'grow .3s linear forwards',
    shrink: 'shrink .3s linear forwards',
  },
};
