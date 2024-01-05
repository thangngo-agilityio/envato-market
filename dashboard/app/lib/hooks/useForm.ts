import {
  FieldValues,
  UseFormProps,
  useForm as useReactHookForm,
} from 'react-hook-form';

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  option?: UseFormProps<TFieldValues, TContext>,
) =>
  useReactHookForm<TFieldValues, TContext, TTransformedValues>({
    ...option,
    reValidateMode: 'onBlur',
  });
