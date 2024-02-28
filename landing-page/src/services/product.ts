// Constants
import { ENDPOINTS } from '@app/constants';

// Types
import type { IProduct } from '@app/interfaces';

export const getProducts = async (): Promise<IProduct[]> => {
  const response: Response = await fetch(
    `${import.meta.env.API_PRODUCTS}/${ENDPOINTS.PRODUCTS}`,
  );

  return response.json();
};
