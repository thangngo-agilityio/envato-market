// Types
import type { TRegisterForm } from '@app/components/ContactForm';

// Constants
import { ENDPOINTS, ERROR_MESSAGES, ROUTES, STORE_KEYS } from '@app/constants';

// Types
import type { IProductInCart } from '@app/interfaces';
import { localStore } from '@app/utils';

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

export const addToCartWithLocalStore = (
  productItem: Omit<IProductInCart, 'id'>,
) => {
  const store = localStore(STORE_KEYS.CART);

  store.add([...(store.get<IProductInCart[]>() || []), productItem]);
};

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

export const checkout = (data: TRegisterForm): Promise<void> =>
  fetch(`${import.meta.env.PUBLIC_API_CHECKOUT}${ROUTES.CHECKOUT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: `${import.meta.env.PUBLIC_USER_ID}`,
      totalAmount: 1,
      ...data,
      zip: +data.zip,
    }),
  }).then((res) => {
    if ([4, 5].includes(+`${res.status}`[0])) {
      throw new Error(ERROR_MESSAGES.CHECKOUT);
    }

    return res.json();
  });

export const deleteCart = (id: string): Promise<void> =>
  fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}/${id}`, {
    method: 'Delete',
    body: '',
  }).then((res) => {
    if ([4, 5].includes(+`${res.status}`[0])) {
      throw new Error(ERROR_MESSAGES.CHECKOUT);
    }

    return res.json();
  });
