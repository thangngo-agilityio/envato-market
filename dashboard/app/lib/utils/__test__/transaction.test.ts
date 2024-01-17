import { TRANSACTIONS } from '@/lib/mocks';
import { getTransactionHomePage } from '../transaction';

describe('getTransactionHomePage', () => {
  it('transforms transactions correctly', () => {
    const result = getTransactionHomePage([TRANSACTIONS[0]]);

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
        email: 'devon@mail.com',
        location: '123 MD DN',
        image: '/images/big-avatar.webp',
        amount: '$101.00',
        date: 'Feb 26, 1689',
        paymentStatus: 'Paid',
        transactionStatus: 'Cancelled',
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = getTransactionHomePage();

    expect(result).toEqual([]);
  });
});
