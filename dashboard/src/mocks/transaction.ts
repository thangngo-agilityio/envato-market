import {
  PAYMENT_STATUS_ENUM,
  TRANSACTION_STATUS_ENUM,
} from '@app/constants/transaction';

export const TRANSACTIONS = [
  {
    id: '1701513537051',
    customer: {
      id: '2701513537051',
      name: 'Devon Lane',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
      email: 'devon@mail.com',
      location: 'Philadelphia, USA',
    },
    amount: '101',
    currency: '$',
    date: '1681982541000',
    paymentStatus: PAYMENT_STATUS_ENUM.PAID,
    transactionStatus: TRANSACTION_STATUS_ENUM.CANCELED,
  },
  {
    id: '1701513537052',
    customer: {
      id: '2701513537052',
      name: 'Bessie Cooper',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
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
      name: 'Zepeda lorna',
      avatar:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
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
