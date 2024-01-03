import { TRANSACTIONS } from '@app/mocks';
import { getTransactionHomePage } from '../transaction';
import { formatDate } from '../time';
import { formatDecimalNumber, formatUppercaseFirstLetter } from '..';

describe('getTransactionHomePage', () => {
  it('transforms transactions correctly', () => {
    const result = getTransactionHomePage([TRANSACTIONS[0]]);

    expect(result).toEqual([
      {
        id: '1701513537051',
        name: 'Devon Lane',
        email: 'devon@mail.com',
        location: 'Philadelphia, USA',
        date: formatDate(+TRANSACTIONS[0].date),
        image: TRANSACTIONS[0].customer.avatar,
        paymentStatus: formatUppercaseFirstLetter(
          TRANSACTIONS[0].paymentStatus,
        ),
        transactionStatus: formatUppercaseFirstLetter(
          TRANSACTIONS[0].transactionStatus,
        ),
        spent: `${TRANSACTIONS[0].currency}${formatDecimalNumber(
          +TRANSACTIONS[0].amount,
        )}`,
      },
    ]);
  });

  it('transforms transactions with empty data', () => {
    const result = getTransactionHomePage();

    expect(result).toEqual([]);
  });
});
