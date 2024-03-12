// Lib
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Store
import { authStore } from '@/lib/stores';

// Constants
import { END_POINTS, PRODUCT_STATUS } from '@/lib/constants';

// Services
import { getProducts, productsHttpService } from '@/lib/services';

// Interface
import { TProduct, TProductRequest, TProductResponse } from '@/lib/interfaces';

export type TSearchProduct = {
  name: string;
};

export const useProducts = (queryParam?: TSearchProduct) => {
  const queryClient = useQueryClient();
  const { user } = authStore();

  const { name: searchName }: TSearchProduct = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: products = [], ...query } = useQuery({
    queryKey: [END_POINTS.PRODUCTS, searchName],
    queryFn: ({ signal }) => getProducts('', { signal }, user?.id),
  });

  const { mutate: createProduct, isPending: isCreateProduct } = useMutation({
    mutationFn: async (product: Omit<TProductRequest, '_id'>) =>
      await productsHttpService.post<TProductRequest>(
        END_POINTS.PRODUCTS,
        product,
      ),
    onSuccess: (dataResponse) => {
      const newData = JSON.parse(dataResponse.config.data);

      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProduct[]) => [newData, ...oldData],
      );
    },
  });

  const { mutate: deleteProduct, isPending: isDeleteProduct } = useMutation({
    mutationFn: async (
      payload: Partial<TProductRequest & { userId: string; productId: string }>,
    ) => {
      await productsHttpService.delete(END_POINTS.PRODUCTS, {
        data: payload,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProduct[]) =>
          oldData.filter((item) => item._id !== variables.productId),
      );
    },
  });

  const { mutate: updateProduct, isPending: isUpdateProduct } = useMutation({
    mutationFn: async (
      product: Partial<TProductRequest & { userId: string; productId: string }>,
    ) =>
      await productsHttpService.put<TProductRequest>(
        END_POINTS.PRODUCTS,
        product,
      ),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.PRODUCTS, searchName],
        (oldData: TProductResponse[]) => {
          const dataUpdated = oldData.map((item) =>
            item._id === variables.productId
              ? {
                  ...item,
                  name: variables.name,
                  imageURLs: variables.imageURLs,
                  stock: variables.stock,
                  productStatus:
                    Number(variables.stock) > 0
                      ? PRODUCT_STATUS.IN_STOCK
                      : PRODUCT_STATUS.SOLD,
                  amount: variables.amount,
                  product: { ...variables },
                }
              : item,
          );
          return dataUpdated;
        },
      );
    },
  });

  return {
    ...query,
    products,
    isCreateProduct,
    isDeleteProduct,
    isUpdateProduct,
    createProduct,
    deleteProduct,
    updateProduct,
  };
};
