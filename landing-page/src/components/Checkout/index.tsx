import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

// Components
import { ContactForm, Indicator, Toast } from '@app/components';
import CardTotal from '../CardTotal';

// Types
import type { TRegisterForm } from '../ContactForm';

// Hooks
import { useIndicator, useToast } from '@app/hooks';

// Constants
import { ROUTES, SUBTOTAL, SUCCESS_MESSAGE } from '@app/constants';

// Services
import { checkout, deleteCart } from '@app/services';

// Types
import type { IProductInCart } from '@app/interfaces';

type TCheckoutProps = {
  total: number;
  cart: IProductInCart[];
};

const defaultForm: TRegisterForm = {
  firstName: '',
  lastName: '',
  email: '',
  state: '',
  address: '',
  street: '',
  zip: '',
};

const Checkout = ({ total, cart }: TCheckoutProps): JSX.Element => {
  const { isOpen, onToggle } = useIndicator();
  const [currentTotal, setCurrentTotal] = useState<number>(total);
  const { toast, resetToast, pauseToast, showToast } = useToast();

  const { register, watch, reset } = useForm<TRegisterForm>({
    defaultValues: defaultForm,
  });

  const handleCheckout = useCallback(async () => {
    onToggle();

    try {
      await Promise.all([
        checkout(watch(), total),
        cart.map(({ id }) => deleteCart(id)),
      ]);

      showToast({
        message: SUCCESS_MESSAGE.CHECKOUT,
      });

      setCurrentTotal(0);

      reset(defaultForm);

      window.location.replace(ROUTES.HOME);
    } catch (error) {
      const { message } = error as Error;

      showToast({
        message,
        type: 'error',
      });
    } finally {
      onToggle();
    }
  }, [onToggle, watch, total, cart, showToast, reset]);

  const isDisable: boolean = !Object.values(watch()).every((value) => value);

  return (
    <Indicator isOpen={isOpen}>
      <h2 className='capitalize font-primary text-primary text-3xl py-[30px]'>
        Checkout
      </h2>
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
            subTotal={!currentTotal ? 0 : SUBTOTAL}
            delivery='Free'
            total={currentTotal + SUBTOTAL}
            isDisableSubmit={isDisable || !currentTotal}
          />
        </div>
      </form>
      <Toast
        {...toast}
        onBlur={resetToast}
        onHover={pauseToast}
        isOpen={!!toast.message}
      />
    </Indicator>
  );
};

export default Checkout;
