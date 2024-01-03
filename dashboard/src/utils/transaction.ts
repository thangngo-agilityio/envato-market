// Types
import { TDataSource, TTransaction } from '@app/interfaces';

// Utils
import { formatDate, formatDecimalNumber, formatUppercaseFirstLetter } from '.';

/**
 * Convert data show for home page
 * @param transactions
 * @returns
 */
export const getTransactionHomePage = (
  transactions: TTransaction[] = [],
): TDataSource[] =>
  transactions.map((transaction) => {
    const {
      id,
      customer: { avatar, name, location, email },
      amount,
      currency,
      date,
      paymentStatus,
      transactionStatus,
    } = transaction;

    return {
      id,
      name: formatUppercaseFirstLetter(name),
      email,
      location,
      date: formatDate(+date),
      paymentStatus: formatUppercaseFirstLetter(paymentStatus),
      transactionStatus: formatUppercaseFirstLetter(transactionStatus),
      image: avatar,
      spent: `${currency}${formatDecimalNumber(+amount)}`,
    };
  });
