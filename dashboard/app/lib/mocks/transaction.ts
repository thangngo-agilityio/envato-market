import { PAYMENT_STATUS_ENUM, TRANSACTION_STATUS_ENUM } from '@/lib/constants';
import { TTransaction } from '@/lib/interfaces';

export const TRANSACTIONS: TTransaction[] = [
  {
    _id: '1701513537051',
    customer: {
      customerId: null,
      firstName: 'Devon',
      lastName: 'Lane',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
      email: 'devon@mail.com',
      address: {
        state: 'Philadelphia, USA',
        street: '123 MD',
        city: 'DN',
        zip: 31232,
      },
    },
    amount: '101',
    currency: '$',
    name: 'Devon Lane 1',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
    createdAt: '1681982541000',
    location: 'Philadelphia, USA',
    paymentStatus: PAYMENT_STATUS_ENUM.PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.CANCELED,
  },
  {
    _id: '1701513537052',
    customer: {
      customerId: '2701513537052',
      firstName: 'Bessie',
      lastName: 'Cooper',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
      email: 'bessie@mail.com',
      address: {
        state: 'Philadelphia, USA',
        street: '123 MD',
        city: 'DN',
        zip: 13444,
      },
    },
    amount: '101',
    currency: '$',
    name: 'Bessie Cooper 1',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
    createdAt: '1681982541000',
    location: 'Philadelphia, USA',
    paymentStatus: PAYMENT_STATUS_ENUM.PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.COMPLETED,
  },
  {
    _id: '1701513537053',
    customer: {
      customerId: '2701513537053',
      firstName: 'Zepeda',
      lastName: 'lorna',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/ceee380f/dunk-low-shoes-t9dFBx.png',
      email: 'dianne@mail.com',
      address: {
        state: 'Philadelphia, USA',
        street: '123 MD',
        city: 'DN',
        zip: 12345,
      },
    },
    amount: '101',
    currency: '$',
    name: 'Zepeda lorna 1',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/.png',
    location: 'Philadelphia, USA',
    createdAt: '1681982541000',
    paymentStatus: PAYMENT_STATUS_ENUM.UN_PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.PENDING,
  },
];
