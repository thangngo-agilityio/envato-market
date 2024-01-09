import React from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        placeholder='First Name'
        {...register('First Name', { required: true, maxLength: 80 })}
      />
      <input
        type='text'
        placeholder='Last Name'
        {...register('Last Name', { required: true, maxLength: 100 })}
      />
      <input
        type='text'
        placeholder='Company Name'
        {...register('Company Name', { required: true, maxLength: 100 })}
      />
      <input
        type='text'
        placeholder='Email'
        {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      <select {...register('Title', { required: true })}>
        <option value='Mr'>Mr</option>
        <option value='Mrs'>Mrs</option>
        <option value='Miss'>Miss</option>
        <option value='Dr'>Dr</option>
      </select>
      <input
        type='tel'
        placeholder='Mobile number'
        {...register('Mobile number', {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
      />
      <textarea {...register('Leave a comment about your order', {})} />
    </form>
  );
};

export default ContactForm;
