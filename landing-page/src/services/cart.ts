// Constants
import { ENDPOINTS, ERROR_MESSAGES } from '@app/constants';

// Types
import type { IProductInCart } from '@app/interfaces';

export const addToCart = async (
  productItem: Omit<IProductInCart, 'id'>,
): Promise<IProductInCart> =>
  await fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productItem),
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error(ERROR_MESSAGES.ADD_TO_CART);
    });

export const getCart = (): Promise<IProductInCart[]> =>
  fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}`).then(
    (res) => res.json(),
  );

export const updateQuantity = (
  id: string,
  quantity: number,
): Promise<IProductInCart> =>
  fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}/${id}`, {
    method: 'Patch',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ quantity }),
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error(ERROR_MESSAGES.UPDATE_QUANTITY);
    });
