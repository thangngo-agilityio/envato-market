import { PRODUCT_STATUS_ENUM } from '../constants';

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  stock: number;
  amount: string;
  currency: string;
  createdAt: string;
  imageURLs: string;
  productStatus: PRODUCT_STATUS_ENUM;
};
