// libs
import type { ReactNode } from 'react';

// types
import { TYPE_BUTTON } from '@app/types/Button';
interface ButtonProps {
  children?: ReactNode;
  type?: TYPE_BUTTON;
  className?: string;
  onclick?: () => void;
}
const styleButton = {
  primary: 'leading-14 w-full pt-[25px] pb-5',
  secondary: 'leading-20 w-[280px] h-[80px]',
};

const Button = ({
  children,
  onclick = () => {},
  type = TYPE_BUTTON.PRIMARY,
}: ButtonProps): JSX.Element => (
  <button
    onClick={onclick}
    className={`font-primary text-lg text-white border-none rounded-none px-[7px] bg-sun hover:bg-secondary cursor-pointer ${styleButton[type]}`}
  >
    {children}
  </button>
);

export default Button;
