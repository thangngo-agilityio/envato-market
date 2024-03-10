import { useMutation } from '@tanstack/react-query';
import { TProduct } from '../interfaces';
import { productHttpService } from '../services';
import { END_POINTS } from '../constants';

export const useProducts = () => {
  const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
    mutationFn: async (product: Omit<TProduct, '_id'>) =>
      await productHttpService.post<TProduct>(END_POINTS.PRODUCTS, product),
  });

  return {
    isCreateProduct,
    createProduct,
  };
};
