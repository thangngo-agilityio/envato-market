// libs
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Themes
import { button } from '@app/themes/components';

// Utils
import { getStyles } from '@app/utils';

export enum VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

// TODO: I will change type to tagName later
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: VARIANTS;
  className?: string;
}

const Button = ({
  className = '',
  children,
  variant = VARIANTS.PRIMARY,
  ...rest
}: ButtonProps): JSX.Element => (
  <button
    className={`${getStyles(button.baseStyle)} ${getStyles(
      button.variants[variant],
    )} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
