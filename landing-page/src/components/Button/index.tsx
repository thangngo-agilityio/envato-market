// libs
import type { ReactNode } from 'react';

export enum TYPE_BUTTON {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}
interface ButtonProps {
  children?: ReactNode;
  type?: TYPE_BUTTON;
  className?: string;
  onclick?: () => void;
}
const styleButton = {
  default: 'leading-14',
  primary: 'leading-14 w-full pt-[25px] pb-5',
  secondary: 'leading-20 w-[280px] h-[80px]',
};

const Button = ({
  className = '',
  children,
  onclick = () => {},
  type = TYPE_BUTTON.DEFAULT,
}: ButtonProps): JSX.Element => (
  <button
    onClick={onclick}
    className={`font-primary text-lg text-white border-none rounded-none px-[7px] bg-sun hover:bg-secondary cursor-pointer ${styleButton[type]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
