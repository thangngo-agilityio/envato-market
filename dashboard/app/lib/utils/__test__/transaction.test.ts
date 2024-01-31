// Mocks
import { MOCK_TRANSACTION, MOCK_TRANSACTION_DETAIL } from '@/lib/mocks';

// Interfaces
import { TTransaction } from '@/lib/interfaces';

// Utils
import { formatTransactionResponse } from '@/lib/utils';

// Constants
import { IMAGES } from '@/lib/constants';

describe('formatTransactionResponse', () => {
  it('transforms transactions correctly', () => {
    const result = formatTransactionResponse([MOCK_TRANSACTION_DETAIL]);

    expect(result).toEqual([
      {
        id: '1701513537051',
        name: 'Devon Lane',
        customer: {
          customerId: null,
          avatar:
            'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
          firstName: 'Devon',
          lastName: 'Lane',
          address: {
            city: 'DN',
            state: 'Philadelphia, USA',
            street: '123 MD',
            zip: 31232,
          },
          email: 'devon@mail.com',
          role: undefined,
        },
        type: 'Add money',
        email: 'devon@mail.com',
        location: '123 MD DN',
        image:
          'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
        amount: '$101.00',
        date: 'Feb 26, 1689',
        paymentStatus: 'Paid',
        transactionStatus: 'Cancelled',
      },
    ]);
  });

  it('transforms transactions without image', () => {
    const result = formatTransactionResponse([
      MOCK_TRANSACTION,
    ] as TTransaction[]);

    expect(result).toEqual([
      {
        id: '1701513537051',
        name: 'Devon Lane',
        customer: {
          customerId: null,
          avatar: undefined,
          firstName: 'Devon',
          lastName: 'Lane',
          address: {
            city: 'DN',
            state: 'Philadelphia, USA',
            street: '123 MD',
            zip: 31232,
          },
          email: 'devon@mail.com',
          role: undefined,
        },
        type: 'Add money',
        email: 'devon@mail.com',
        location: '123 MD DN',
        image: IMAGES.BIG_AVATAR.url,
        amount: '$101.00',
        date: 'Feb 26, 1689',
        paymentStatus: 'Paid',
        transactionStatus: 'Cancelled',
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = formatTransactionResponse();

    expect(result).toEqual([]);
  });
});
