import {
  memo,
  useCallback,
  type SelectHTMLAttributes,
  type ChangeEventHandler,
} from 'react';

export type TSelectOption = {
  id: string;
  value: string;
  label: string;
};

export type TSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> & {
  options: TSelectOption[];
  onChange?: (value: string) => void;
};

const Select = ({ options, onChange, ...props }: TSelectProps) => {
  const handleChangeValue: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => onChange && onChange(e.target.value),
    [onChange],
  );

  return (
    <select aria-label='Select' {...props} onChange={handleChangeValue}>
      {options.map(({ id, label, value }) => (
        <option value={value} key={id}>
          {label}
        </option>
      ))}
    </select>
  );
};

const SelectMemorize = memo(Select);

export default SelectMemorize;
