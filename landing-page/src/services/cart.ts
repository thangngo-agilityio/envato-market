// Types
import type { TRegisterForm } from '@app/components/ContactForm';

// Constants
import { ENDPOINTS, ERROR_MESSAGES, ROUTES } from '@app/constants';

// Types
import type { IProductInCart, TApiEventHandlerOption } from '@app/interfaces';

export const addNewProductToCart = async (
  productItem: Omit<IProductInCart, 'id'>,
  options?: Omit<TApiEventHandlerOption, 'onSuccess'> & {
    onSuccess?: (product: IProductInCart) => void;
  },
): Promise<void> => {
  const { onSuccess, onError, onSettled } = options ?? {};
  try {
    const res: Response = await fetch(
      `${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productItem),
      },
    );
    const data: IProductInCart = await res.json();

    onSuccess && onSuccess(data);
  } catch (error) {
    onError && onError(ERROR_MESSAGES.ADD_TO_CART);
  } finally {
    onSettled && onSettled();
  }
};

export const getCartOnClient = async () => {
  try {
    return (
      await fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}`)
    ).json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.ADD_TO_CART);
  }
};

export const getCart = async (): Promise<IProductInCart[]> =>
  (
    await fetch(`${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}`)
  ).json();

export const updateQuantity = async (
  id: string,
  quantity: number,
  options?: TApiEventHandlerOption,
): Promise<void> => {
  const { onSuccess, onError, onSettled }: TApiEventHandlerOption =
    options ?? {};

  try {
    await fetch(
      `${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ quantity }),
      },
    );

    onSuccess && onSuccess();
  } catch (error) {
    onError && onError(ERROR_MESSAGES.UPDATE_QUANTITY);
  } finally {
    onSettled && onSettled();
  }
};

export const addToCart = async (
  id: string,
  infoProduct: Omit<IProductInCart, 'id' | 'productId'>,
  options?: TApiEventHandlerOption,
): Promise<void> => {
  const { onSuccess, onError, onSettled }: TApiEventHandlerOption =
    options ?? {};

  try {
    const productInCart: IProductInCart[] = await getCartOnClient();
    const alreadyExist: IProductInCart | undefined = productInCart.find(
      (item) => item.productId === id,
    );

    if (alreadyExist) {
      await updateQuantity(
        alreadyExist.id,
        infoProduct.quantity + alreadyExist.quantity,
      );
    } else {
      const payload: Omit<IProductInCart, 'id'> = {
        productId: id,
        ...infoProduct,
      };
      await addNewProductToCart(payload);
    }

    onSuccess && onSuccess();
  } catch (error) {
    const { message } = error as Error;

    onError && onError(message);
  } finally {
    onSettled && onSettled();
  }
};

const checkoutHandler = async (
  data: TRegisterForm,
  totalAmount: number,
): Promise<void> => {
  const response: Response = await fetch(
    `${import.meta.env.PUBLIC_API_CHECKOUT}${ROUTES.CHECKOUT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: `${import.meta.env.PUBLIC_USER_ID}`,
        ...data,
        totalAmount,
        zip: +data.zip,
      }),
    },
  );

  if ([4, 5].includes(+`${response.status}`[0])) {
    throw new Error(ERROR_MESSAGES.CHECKOUT);
  }
};

export const checkout = async (
  userInfo: TRegisterForm,
  options?: TApiEventHandlerOption,
): Promise<void> => {
  const { onSuccess, onError, onSettled }: TApiEventHandlerOption =
    options ?? {};
  try {
    const cart = await getCart();
    const total: number = cart.reduce(
      (result, { amount, quantity }) => result + amount * quantity,
      0,
    );

    await Promise.all([
      checkoutHandler(userInfo, total),
      cart.map(({ id }) => deleteCart(id)),
    ]);
    onSuccess && onSuccess();
  } catch (error) {
    const { message } = error as Error;

    onError && onError(message);
  } finally {
    onSettled && onSettled();
  }
};

export const deleteCart = async (
  id: string,
  options?: TApiEventHandlerOption,
): Promise<void> => {
  const { onSuccess, onError, onSettled }: TApiEventHandlerOption =
    options ?? {};

  try {
    const res: Response = await fetch(
      `${import.meta.env.PUBLIC_API_PRODUCTS}${ENDPOINTS.CARTS}/${id}`,
      {
        method: 'Delete',
        body: '',
      },
    );

    if ([4, 5].includes(+`${res.status}`[0])) {
      throw new Error(ERROR_MESSAGES.REMOVE_CART);
    }

    onSuccess && onSuccess();
  } catch (error) {
    const { message } = error as Error;

    onError && onError(message);
  } finally {
    onSettled && onSettled();
  }
};
