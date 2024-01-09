import {
  useCallback,
  useMemo,
  useRef,
  type FormEventHandler,
  type ChangeEventHandler,
} from 'react';

// Components
import { Button, Toast } from '..';

// Services
import { addToCart } from '@app/services';

// Constants
import { SUCCESS_MESSAGE } from '@app/constants';

// Hooks
import { useToast } from '@app/hooks';

type TProductInfoProps = {
  id: string;
  name: string;
  imageURL: string;
  currency: string;
  description: string;
  stock: number;
  amount: number;
};

const ProductInfo = ({
  id,
  imageURL,
  currency,
  amount,
  name,
  stock,
  description,
}: TProductInfoProps): JSX.Element => {
  const { toast, showToast, pauseToast, resetToast } = useToast();
  const refQuantity = useRef<HTMLInputElement>(null);

  const isOutStock: boolean = stock <= 0;

  const statusStock = useMemo(() => {
    if (isOutStock) {
      return {
        title: 'out stock',
        color: 'bg-red-500',
      };
    }

    return { title: 'in stock', color: 'bg-green-500' };
  }, [isOutStock]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const quantity: number = parseInt(
          refQuantity.current ? refQuantity.current.value : '1',
        );

        await addToCart({
          productId: id,
          currency,
          amount,
          name,
          quantity,
          imageURL,
        });

        showToast({ message: SUCCESS_MESSAGE.ADD_TO_CART, type: 'success' });
      } catch (error) {
        const { message } = error as Error;

        showToast({ message, type: 'error' });
      }
    },
    [amount, currency, id, imageURL, name, showToast],
  );

  const handleChangeQuantity: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      const value = e.target.value;

      if (parseInt(value) <= 1) {
        e.target.defaultValue = `${1}`;
        e.target.value = `${1}`;

        return;
      }
    }, []);

  return (
    <section className='col-span-12 nearLg:col-span-5 mt-[70px] nearLg:mt-0 font-primary'>
      <p className='text-2xl text-sun py-[15px] relative after:absolute after:block after:top-0 after:w-[80px] after:h-[3px] after:bg-sun'>
        {currency}
        {amount}
      </p>

      <h6 className='text-3xl pb-3'>{name}</h6>
      <p className='flex items-center text-xs text-elementary gap-1'>
        <span
          className={`block w-2 h-2 rounded-full ${statusStock.color}`}
        ></span>
        <span>{statusStock.title}</span>
      </p>
      <p className='text-base text-elementary my-12'>{description}</p>
      <form className='flex flex-col gap-14' onSubmit={handleSubmit}>
        <input
          ref={refQuantity}
          defaultValue={1}
          type='number'
          className='bg-desertStorm px-3 h-10 w-[100px] text-center'
          onChange={handleChangeQuantity}
          disabled={isOutStock}
        />

        <Button
          className={`w-full sm:w-[280px] md:w-[310px] nearLg:w-full lg:w-[310px] ${
            isOutStock && 'bg-slate-200'
          }`}
          disabled={isOutStock}
        >
          Add to cart
        </Button>
      </form>

      <Toast
        message={toast.message}
        isOpen={!!toast.message}
        type={toast.type}
        onHover={pauseToast}
        onBlur={resetToast}
      />
    </section>
  );
};

export default ProductInfo;
