// Constants
import {
  PAYMENT_STATUS_ENUM,
  TRANSACTION_STATUS_ENUM,
} from '@app/constants/transaction';

// Interfaces
import { TTransaction } from '@app/interfaces';

export const HISTORY: TTransaction[] = [
  {
    id: '1701513537051',
    customer: {
      id: '2701513537051',
      name: 'Devon Lane',
      avatar: '',
      email: 'devon@mail.com',
      location: 'Philadelphia, USA',
    },
    date: '1681982541000',
    currency: '$',
    amount: '101',
    paymentStatus: PAYMENT_STATUS_ENUM.PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.CANCELED,
  },
  {
    id: '1701513537052',
    customer: {
      id: '2701513537052',
      name: 'Bessie Cooper',
      avatar: '',
      email: 'bessie@mail.com',
      location: 'Philadelphia, USA',
    },
    amount: '101',
    currency: '$',
    date: '1681982541000',
    paymentStatus: PAYMENT_STATUS_ENUM.PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.COMPLETED,
  },
  {
    id: '1701513537053',
    customer: {
      id: '2701513537053',
      name: 'Dianne Russell',
      avatar: '',
      email: 'dianne@mail.com',
      location: 'Philadelphia, USA',
    },
    amount: '101',
    currency: '$',
    date: '1681982541000',
    paymentStatus: PAYMENT_STATUS_ENUM.UN_PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.PENDING,
  },
];
