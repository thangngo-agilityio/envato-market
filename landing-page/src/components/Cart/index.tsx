import { useCallback, useMemo, useState } from 'react';

// Components
import ProductTable from './ProductTable';
import CardTotal from '../CardTotal';
import { Indicator, Toast } from '..';

// Constants
import { ROUTES, SUCCESS_MESSAGE } from '@app/constants';

// Mocks
import { CARD_TOTAL } from '@app/mocks';

// Types
import type { IProductInCart } from '@app/interfaces';

// Services
import { deleteCart, updateQuantity } from '@app/services';

// Hooks
import { useIndicator, useToast } from '@app/hooks';

type TCartProps = {
  data: IProductInCart[];
};

const Cart = ({ data }: TCartProps): JSX.Element => {
  const { isOpen, onToggle } = useIndicator();
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
      onToggle();

      try {
        await updateQuantity(productId, quantity);
        setCart((prev: IProductInCart[]) =>
          prev.map((product) => {
            if (product.id === productId && quantity > 0)
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
      } finally {
        onToggle();
      }
    },
    [onToggle, showToast],
  );

  const handleRemoveProductItem = useCallback(
    async (id: string) => {
      onToggle();

      try {
        await deleteCart(id);
        setCart((prev: IProductInCart[]) =>
          prev.filter((product) => product.id !== id),
        );
        showToast({ message: SUCCESS_MESSAGE.REMOVE_CART });
      } catch (error) {
        const { message } = error as Error;

        showToast({ message, type: 'error' });
      } finally {
        onToggle();
      }
    },
    [onToggle, showToast],
  );

  const handleCheckout = useCallback(() => {
    if (window) {
      window.location.assign(ROUTES.CHECKOUT);
    }
  }, []);

  const isDisableSubmit: boolean = !cart.length;

  return (
    <Indicator isOpen={isOpen}>
      <h2 className='capitalize font-primary text-primary text-3xl py-[30px]'>
        Shopping Cart
      </h2>
      <section className='nearLg:grid nearLg:grid-cols-12 nearLg:gap-[30px]'>
        <div className='col-span-12 nearLg:col-span-8 h-[500px]'>
          <ProductTable
            products={cart}
            onChangeQuantity={handleChangeQuantity}
            onRemoveProduct={handleRemoveProductItem}
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
    </Indicator>
  );
};

export default Cart;
