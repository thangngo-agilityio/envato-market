// libs
import type { ReactNode } from 'react';

export enum TYPE_BUTTON {
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
  primary: 'leading-14 pt-[25px] pb-5',
  secondary: 'leading-20 w-[280px] h-[80px]',
};

const Button = ({
  className = '',
  children,
  onclick = () => {},
  type = TYPE_BUTTON.PRIMARY,
}: ButtonProps): JSX.Element => (
  <button
    onClick={onclick}
    className={`font-primary text-lg border-none rounded-none px-[7px] bg-sun hover:bg-secondary cursor-pointer ${styleButton[type]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
