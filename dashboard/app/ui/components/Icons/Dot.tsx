import { SVGProps } from 'react';

export const Dot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={4}
    fill="none"
    {...props}
  >
    <path
      stroke="#A0AEC0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM1 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM15 2a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
    />
  </svg>
);
