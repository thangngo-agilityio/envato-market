import { useCallback, useMemo } from 'react';

// Components
import ProductTable from './ProductTable';
import CardTotal from '../CardTotal';

// Constants
import { ROUTES, STORE_KEYS } from '@app/constants';

// Mocks
import { CARD_TOTAL } from '@app/mocks';

// Hooks
import { useCart } from '@app/hooks/useCart';

// Types
import type { IProductInCart } from '@app/interfaces';

// Utils
import { localStore } from '@app/utils';

const Cart = (): JSX.Element => {
  const { isLoading, data: cart, handleChangeQuantity } = useCart();
  const total: number = useMemo(
    () =>
      cart.reduce(
        (result: number, { quantity, amount }: IProductInCart) =>
          result + amount * quantity,
        0,
      ),
    [cart],
  );

  const handleCheckout = useCallback(() => {
    if (window) {
      localStore(STORE_KEYS.TOTAL).add(total);
      window.location.assign(ROUTES.CHECKOUT);
    }
  }, [total]);

  return (
    <>
      <h2 className='capitalize font-primary text-3xl py-[30px]'>
        Shopping Cart
      </h2>
      <section className='nearLg:grid nearLg:grid-cols-12 nearLg:gap-[30px]'>
        <div className='col-span-12 nearLg:col-span-8 h-[500px] overflow-y-scroll'>
          {isLoading ? (
            <div className='h-full flex justify-center items-center'>
              <p className='nearLg:text-xl'>Please wait...</p>
            </div>
          ) : (
            <ProductTable
              products={cart}
              onChangeQuantity={handleChangeQuantity}
            />
          )}
        </div>
        <div className='mt-[118px] nearLg:mt-0 col-span-12 nearLg:col-span-4'>
          <CardTotal
            {...CARD_TOTAL}
            currency='$'
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </section>
    </>
  );
};

export default Cart;
