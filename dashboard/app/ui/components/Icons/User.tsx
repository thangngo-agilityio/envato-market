import { TIcon } from '@/lib/interfaces';

export const UserIcon = ({ color }: TIcon) => (
  <svg
    stroke={color}
    strokeWidth="1.5"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      stroke={color}
      cx="11.7778"
      cy="17.5555"
      rx="7.77778"
      ry="4.44444"
      className="path-1"
      fill={color ? '' : '#1A202C'}
    ></ellipse>
    <circle
      stroke={color}
      className="path-2"
      cx="11.7778"
      cy="6.44444"
      r="4.44444"
      fill={color ? '' : '#22C55E'}
    ></circle>
  </svg>
);
