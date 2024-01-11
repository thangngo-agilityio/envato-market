import { useCallback, useMemo, useState } from 'react';

// Components
import ProductTable from './ProductTable';
import CardTotal from '../CardTotal';
import { Toast } from '..';

// Constants
import { ROUTES } from '@app/constants';

// Mocks
import { CARD_TOTAL } from '@app/mocks';

// Types
import type { IProductInCart } from '@app/interfaces';

// Services
import { updateQuantity } from '@app/services';

// Hooks
import { useToast } from '@app/hooks';

type TCartProps = {
  data: IProductInCart[];
};

const Cart = ({ data }: TCartProps): JSX.Element => {
  const { toast, showToast, pauseToast, resetToast } = useToast();
  const [cart, setCart] = useState<IProductInCart[]>(data);

  const total: number = useMemo(
    () =>
      cart.reduce(
        (result: number, { quantity, amount }: IProductInCart) =>
          result + amount * quantity,
        0,
      ),
    [cart],
  );

  const handleChangeQuantity = useCallback(
    async (productId: string, quantity: number): Promise<void> => {
      try {
        await updateQuantity(productId, quantity);
        setCart((prev: IProductInCart[]) =>
          prev.map((product) => {
            if (product.productId === productId && quantity > 0)
              return {
                ...product,
                quantity,
              };

            return product;
          }),
        );
      } catch (error) {
        const { message } = error as Error;

        showToast({ message, type: 'error' });
      }
    },
    [],
  );

  const handleCheckout = useCallback(() => {
    if (window) {
      window.location.assign(ROUTES.CHECKOUT);
    }
  }, []);

  const isDisableSubmit: boolean = !cart.length;

  return (
    <>
      <h2 className='capitalize font-primary text-3xl py-[30px]'>
        Shopping Cart
      </h2>
      <section className='nearLg:grid nearLg:grid-cols-12 nearLg:gap-[30px]'>
        <div className='col-span-12 nearLg:col-span-8 h-[500px] overflow-y-scroll'>
          <ProductTable
            products={cart}
            onChangeQuantity={handleChangeQuantity}
          />
        </div>
        <div className='mt-[118px] nearLg:mt-0 col-span-12 nearLg:col-span-4'>
          <CardTotal
            {...CARD_TOTAL}
            currency='$'
            total={total}
            onCheckout={handleCheckout}
            isDisableSubmit={isDisableSubmit}
          />
        </div>
      </section>
      <Toast
        message={toast.message}
        isOpen={!!toast.message}
        type={toast.type}
        onHover={pauseToast}
        onBlur={resetToast}
      />
    </>
  );
};

export default Cart;
