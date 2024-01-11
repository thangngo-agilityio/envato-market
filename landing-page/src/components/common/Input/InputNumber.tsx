import {
  useCallback,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  memo,
  forwardRef,
  type ForwardedRef,
} from 'react';
import isEqual from 'react-fast-compare';

// Icons
import { Carret as ArrowIcon } from '@app/components/icons';

type TInputNumberProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onIncrease?: () => void;
  onDecrease?: () => void;
  onChange?: (value: number) => void;
};

const InputNumber = (
  {
    className = '',
    onIncrease,
    onDecrease,
    onChange,
    ...props
  }: TInputNumberProps,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => {
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;

      if (parseInt(value) <= 1) {
        e.target.defaultValue = `${1}`;
        e.target.value = `${1}`;

        return;
      }

      if (onChange) return onChange(parseInt(e.target.value));
    },
    [onChange],
  );

  return (
    <div className='relative w-fit xl:w-[113px]'>
      <span className={'absolute right-[5px] top-[5px]'}>
        <ArrowIcon onClick={onIncrease} />
      </span>
      <input
        min='1'
        max='300'
        step='1'
        value='1'
        className={`block w-full text-center bg-desertStorm py-2 ${className}`}
        {...props}
        {...(onChange && { onChange: handleChangeInput })}
        ref={ref}
      />
      <span className={'absolute right-[5px] bottom-[5px]'}>
        <ArrowIcon className='rotate-180' onClick={onDecrease} />
      </span>
    </div>
  );
};

const InputNumberMemorized = memo(forwardRef(InputNumber), isEqual);

export default InputNumberMemorized;
