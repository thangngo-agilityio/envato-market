import isEqual from 'react-fast-compare';
import {
  memo,
  useCallback,
  type InputHTMLAttributes,
  type ChangeEventHandler,
} from 'react';

const SIZES = {
  md: 'h-xl',
  lg: 'h-2xl',
};

const VARIANTS = {
  primary: 'bg-desert-storm',
  secondary: 'bg-white italic placeholder:text-sparingly font-normal',
};

type TInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'size'
> & {
  isError?: boolean;
  label?: string;
  errorMessage?: string;
  size?: keyof typeof SIZES;
  variant?: keyof typeof VARIANTS;
  onChange?: (value: string) => void;
};

const Input = ({
  isError = false,
  size = 'lg',
  variant = 'primary',
  value = '',
  className = '',
  errorMessage = '',
  onChange,
  ...rest
}: TInputProps): JSX.Element => {
  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value: string = e.target.value;

      onChange && onChange(value);
    },
    [onChange],
  );

  const errorStyle: string = isError ? 'focus:shadow-red-300' : '';
  const style: string = `px-10 w-full h-full text-sm focus:shadow-sm ${errorStyle} outline-none transition-shadow  ${VARIANTS[variant]} ${className}`;
  const errorMsgStyles: string =
    'text-red-600 text-sm min-h-2 min-w-6 absolute top-15 left-0';

  return (
    <div className={`relative w-full ${SIZES[size]}`}>
      <input
        {...rest}
        value={value}
        className={style}
        onChange={handleChangeValue}
      />
      {!!errorMessage && <p className={errorMsgStyles}>{errorMessage}</p>}
    </div>
  );
};

const InputMemoried = memo(Input, isEqual);

export default InputMemoried;
