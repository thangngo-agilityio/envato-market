import type { FormEvent } from 'react';
import { type UseFormRegister } from 'react-hook-form';

export type TRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
  address: string;
  street: string;
  zip: string;
};

type TContactFormProps = {
  register: UseFormRegister<TRegisterForm>;
  onSubmit?: () => void;
};

const ContactForm = ({ register, onSubmit }: TContactFormProps) => {
  const inputStyle: string = [
    'text-onceAll',
    'text-[14px]',
    'w-full',
    'border-0',
    'rounded-none',
    'bg-desertStorm',
    'p-5',
    'focus:outline-none',
  ].join(' ');

  return (
    <div
      className='flex flex-wrap [&>*:nth-child(n)]:w-full [&>*:nth-child(n)]:mb-4'
      onSubmit={(e: FormEvent) => {
        e.preventDefault();

        onSubmit && onSubmit();
      }}
    >
      <div className='md:!w-[50%] md:pr-[15px]'>
        <input
          className={`${inputStyle}`}
          placeholder='First Name'
          {...register('firstName', { required: true, maxLength: 80 })}
        />
      </div>
      <div className='md:!w-[50%] md:pl-[15px]'>
        <input
          className={`${inputStyle}`}
          placeholder='Last Name'
          {...register('lastName', { required: true, maxLength: 100 })}
        />
      </div>
      <div>
        <input
          className={`${inputStyle}`}
          placeholder='Email'
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <div>
        <select
          className={`${inputStyle}`}
          {...register('state', { required: true })}
        >
          <option value=''>Choose...</option>
          <option value='United States'>United States</option>
          <option value='Germany'>Germany</option>
          <option value='France'>France</option>
          <option value='India'>India</option>
          <option value='Australia'>Australia</option>
          <option value='Brazil'>Brazil</option>
        </select>
      </div>
      <div>
        <input
          className={`${inputStyle} mb-4`}
          placeholder='Address'
          {...register('address', { required: true, maxLength: 100 })}
        />
      </div>
      <div className='md:!w-[50%] md:pr-[15px]'>
        <input
          className={`${inputStyle}`}
          placeholder='Town'
          {...register('street', { required: true, maxLength: 100 })}
        />
      </div>
      <div className='md:!w-[50%] md:pr-[15px]'>
        <input
          className={`${inputStyle}`}
          placeholder='Zip Code'
          {...register('zip', { required: true, maxLength: 100 })}
        />
      </div>

      {/* <button type='submit'></button> */}
    </div>
  );
};

export default ContactForm;
