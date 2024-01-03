// Types
import { TIcon } from '@app/interfaces';

export const AvatarSetting = ({ color = 'gray.800' }: Partial<TIcon>) => (
  <svg
    stroke={color}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="12"
      cy="17.5"
      rx="7"
      ry="3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    ></ellipse>
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    ></circle>
  </svg>
);
