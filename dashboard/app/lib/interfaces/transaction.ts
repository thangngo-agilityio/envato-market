// Constants
import { PAYMENT_STATUS_ENUM, TRANSACTION_STATUS_ENUM } from '@/lib/constants';

// Types
import { TCustomer } from '.';

export type TTransaction = {
  _id: string;
  userId?: string;
  customer: TCustomer;
  amount: string;
  currency: string;
  createdAt: string;
  name: string;
  location: string;
  image: string;
  type: string;
  paymentStatus: PAYMENT_STATUS_ENUM;
  transactionStatus: TRANSACTION_STATUS_ENUM;
};

export interface IDataList {
  dataTransaction: TTransaction[];
  dataHistory: TTransaction[];
}
