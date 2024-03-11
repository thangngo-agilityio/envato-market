import { PRODUCT_STATUS } from '../constants';

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  stock: number;
  amount: string;
  currency: string;
  createdAt: string;
  imageURLs: string;
  productStatus: PRODUCT_STATUS;
};
