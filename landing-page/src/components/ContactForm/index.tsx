import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const inputStyle: string = [
    'text-onceAll',
    'text-[14px]',
    'w-full',
    'border-0',
    'rounded-none',
    'bg-desertStorm',
    'p-lg',
    'focus:outline-none',
    'border-[#80bdff]',
    'focus:border-4',
  ].join(' ');
  const { register, handleSubmit } = useForm();
  return (
    <form
      className='flex flex-wrap [&>*:nth-child(n)]:w-full [&>*:nth-child(n)]:mb-4 [&>*:nth-child(n)]:px-[15px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='md:!w-[50%] md:pr-[15px]'>
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='First Name'
          {...register('First Name', { required: true, maxLength: 80 })}
        />
      </div>
      <div className='md:!w-[50%] md:pl-[15px]'>
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='Last Name'
          {...register('Last Name', { required: true, maxLength: 100 })}
        />
      </div>
      <div>
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='Company Name'
          {...register('Company Name', { required: true, maxLength: 100 })}
        />
      </div>
      <div>
        {' '}
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='Email'
          {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <div>
        <select
          className={`${inputStyle}`}
          {...register('Title', { required: true })}
        >
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
          type='text'
          placeholder='Address'
          {...register('Company Name', { required: true, maxLength: 100 })}
        />
      </div>
      <div>
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='Town'
          {...register('Town', { required: true, maxLength: 100 })}
        />
      </div>
      <div className='md:!w-[50%] md:pr-[15px]'>
        <input
          className={`${inputStyle}`}
          type='text'
          placeholder='Zip Code'
          {...register('Zip Code', { required: true, maxLength: 100 })}
        />
      </div>
      <div className='md:!w-[50%] md:pl-[15px]'>
        {' '}
        <input
          className={`${inputStyle}`}
          type='tel'
          placeholder='Phone No'
          {...register('Mobile number', {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
      </div>
      <div>
        <textarea
          className={`${inputStyle}`}
          {...register('Leave a comment about your order', {})}
        />
      </div>
    </form>
  );
};

export default ContactForm;
