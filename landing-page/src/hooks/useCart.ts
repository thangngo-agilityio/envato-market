import { useCallback, useEffect, useState } from 'react';

// Types
import type { IProductInCart } from '@app/interfaces';

// Services
import { getCart } from '@app/services';

type TOptions = {
  pause: boolean;
};

export const useCart = (options?: TOptions) => {
  const { pause = false } = options || {};
  const [data, setData] = useState<IProductInCart[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChangeQuantity = useCallback(
    (productId: string, quantity: number): void => {
      console.log('productId', productId);
      console.log('quantity', quantity);

      setData((prev: IProductInCart[]) =>
        prev.map((product) => {
          if (product.productId === productId && quantity > 0)
            return {
              ...product,
              quantity,
            };

          return product;
        }),
      );
    },
    [],
  );

  const handleCheckout = useCallback(() => {}, []);

  useEffect(() => {
    if (!pause) {
      setLoading(true);
      getCart()
        .then((value: IProductInCart[]) => setData(value))
        .finally(() => setLoading(false));
    }
  }, [pause]);

  return {
    data,
    isLoading,
    handleCheckout,
    handleChangeQuantity,
  };
};
