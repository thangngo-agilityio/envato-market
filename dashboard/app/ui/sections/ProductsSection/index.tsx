'use client';

import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';
import { useProducts } from '@/lib/hooks';
import { TProduct } from '@/lib/interfaces';
import { customToast } from '@/lib/utils';
import { Button, Indicator, Modal } from '@/ui/components';
import { ProductForm } from '@/ui/components/common/Table/Body';
import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

const ProductsSection = () => {
  const toast = useToast();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const { createProduct, isCreateProduct } = useProducts();

  const handleToggleModal = () => setIsOpenConfirmModal((prev) => !prev);

  const handleCreateProduct = useCallback(
    (product: Omit<TProduct, 'id'>) => {
      createProduct(
        {
          ...product,
        },
        {
          onSuccess: () => {
            toast(
              customToast(
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.title,
                SUCCESS_MESSAGES.CREATE_PRODUCT_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.title,
                ERROR_MESSAGES.UPDATE_TRANSACTION_FAIL.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [createProduct, toast],
  );

  return (
    <>
      <Button
        w={200}
        type="button"
        role="button"
        aria-label="Add User"
        colorScheme="primary"
        bg="primary.300"
        textTransform="capitalize"
        onClick={handleToggleModal}
      >
        Add User
      </Button>

      {isOpenConfirmModal && (
        <Indicator isOpen={isCreateProduct}>
          <Modal
            isOpen={isOpenConfirmModal}
            onClose={handleToggleModal}
            title="Add User"
            body={
              <ProductForm
                onCloseModal={handleToggleModal}
                onCreateProduct={handleCreateProduct}
              />
            }
            haveCloseButton
          />
        </Indicator>
      )}
    </>
  );
};
export default ProductsSection;
