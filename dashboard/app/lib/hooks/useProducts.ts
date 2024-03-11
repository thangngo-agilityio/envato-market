// Lib
import { useMutation, useQuery } from '@tanstack/react-query';

// Store
import { authStore } from '../stores';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { getProducts, productsHttpService } from '@/lib/services';
import { TProductRequest } from '../interfaces';

export type TSearchProduct = {
  name: string;
};

export const useProducts = (queryParam?: TSearchProduct) => {
  const { user } = authStore();

  const { name: searchName }: TSearchProduct = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: products = [] } = useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, searchName],
    queryFn: ({ signal }) => getProducts('', { signal }, user?.id),
  });

  const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
    mutationFn: async (product: Omit<TProductRequest, '_id'>) =>
      await productsHttpService.post<TProductRequest>(
        END_POINTS.PRODUCTS,
        product,
      ),
  });

  return {
    products,
    isCreateProduct,
    createProduct,
  };
};
