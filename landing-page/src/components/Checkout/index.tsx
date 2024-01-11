import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

// Components
import { ContactForm, Toast } from '@app/components';
import CardTotal from '../CardTotal';

// Types
import type { TRegisterForm } from '../ContactForm';

// Hooks
import { useToast } from '@app/hooks';
import { ROUTES } from '@app/constants';

type TCheckoutProps = {
  total: number;
};

const Checkout = ({ total }: TCheckoutProps): JSX.Element => {
  const { toast, resetToast, pauseToast } = useToast();

  const { register, watch } = useForm<TRegisterForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      state: '',
      address: '',
      street: '',
      zip: '',
    },
  });

  const isDisable: boolean = !Object.values(watch()).every((value) => value);

  const handleCheckout = useCallback(() => {
    fetch(`${import.meta.env.PUBLIC_API_CHECKOUT}${ROUTES.CHECKOUT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: `${import.meta.env.PUBLIC_USER_ID}`,
        totalAmount: total,
        ...watch(),
        zip: +watch().zip,
      }),
    });
  }, [total, watch]);

  return (
    <>
      <form
        className='nearLg:grid nearLg:grid-cols-12 nearLg:gap-[30px]'
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
      >
        <div className='col-span-12 nearLg:col-span-8 h-[500px]'>
          <ContactForm register={register} />
        </div>
        <div className='mt-[50px] nearLg:mt-0 col-span-12 nearLg:col-span-4'>
          <CardTotal
            subTotal={140}
            delivery='Free'
            total={total}
            isDisableSubmit={isDisable}
          />
        </div>
      </form>
      <Toast
        {...toast}
        onBlur={resetToast}
        onHover={pauseToast}
        isOpen={!!toast.message}
      />
    </>
  );
};

export default Checkout;
