import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Services
import { getTransactions } from '@/lib/services';

// Constants
import { END_POINTS, TRANSACTION_STATUS_ENUM } from '@/lib/constants';

// Types
import { IDataList, TTransaction } from '@/lib/interfaces';

export type TSearchTransaction = {
  name: string;
  month?: string;
};

type TSortType = 'desc' | 'asc';
export type TSortField = 'name' | 'email' | 'location' | 'spent';
type TSort = {
  field: TSortField | '';
  type: TSortType;
};
export type TSortHandler = (field: TSortField) => void;

export const useTransactions = (
  queryParam?: TSearchTransaction,
  userId?: string,
) => {
  const { name: searchName, month: searchMonth }: TSearchTransaction =
    Object.assign(
      {
        name: '',
        month: '',
      },
      queryParam,
    );

  const sortType: Record<TSortType, TSortType> = useMemo(
    () => ({
      desc: 'asc',
      asc: 'desc',
    }),
    [],
  );

  const [sortValue, setSortValue] = useState<TSort>({
    field: '',
    type: 'asc',
  });

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, searchName, searchMonth],
    queryFn: ({ signal }) => getTransactions('', { signal }, userId),
  });

  //  sort transactions
  const transactionsAfterSort: TTransaction[] = useMemo(() => {
    const tempTransactions: TTransaction[] = [...data];
    const { field, type } = sortValue;

    if (!field) return data;

    const handleSort = (
      type: TSortType,
      prevValue: string,
      nextValue: string,
    ): number => {
      if (type === 'asc') {
        if (prevValue.trim() > nextValue.trim()) return 1;

        if (prevValue.trim() < nextValue.trim()) return -1;
      }

      if (type === 'desc') {
        if (prevValue.trim() > nextValue.trim()) return -1;

        if (prevValue.trim() < nextValue.trim()) return 1;
      }

      return 0;
    };

    tempTransactions.sort(
      (
        {
          customer: {
            firstName: prevCustomerName,
            email: prevEmail,
            address: { state: prevState },
          },
          amount: prevAmount,
        }: TTransaction,
        {
          customer: {
            firstName: nextCustomerName,
            email: nextEmail,
            address: { state: nextState },
          },
          amount: nextAmount,
        }: TTransaction,
      ) => {
        const valueForField: Record<TSortField, number> = {
          name: handleSort(type, prevCustomerName, nextCustomerName),
          email: handleSort(type, prevEmail, nextEmail),
          location: handleSort(type, prevState, nextState),
          spent: handleSort(type, prevAmount, nextAmount),
        };

        return valueForField[field] ?? 0;
      },
    );

    return tempTransactions;
  }, [data, sortValue]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const transactions: TTransaction[] = useMemo((): TTransaction[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().includes(searchName);

    return transactionsAfterSort.filter(
      ({
        customer: {
          firstName,
          lastName,
          email,
          address: { street, state },
        },
      }: TTransaction) => {
        const isMatchWithName: boolean = isNameMatchWith(
          `${firstName} ${lastName}`,
        );
        const isMatchWithEmail: boolean = isNameMatchWith(email);
        const isMatchWithLocation: boolean = isNameMatchWith(
          `${street} ${state}`,
        );

        return isMatchWithEmail || isMatchWithLocation || isMatchWithName;
      },
    );
  }, [transactionsAfterSort, searchName]);

  const { dataTransaction, dataHistory } = transactions.reduce<IDataList>(
    (dataList, transaction) => {
      if (transaction.transactionStatus === TRANSACTION_STATUS_ENUM.ARCHIVED) {
        dataList.dataHistory.push(transaction);
      } else {
        dataList.dataTransaction.push(transaction);
      }
      return dataList;
    },
    { dataTransaction: [], dataHistory: [] },
  );

  const sortBy: TSortHandler = useCallback(
    (field: TSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  return {
    ...query,
    data: transactions,
    dataTransaction,
    dataHistory,
    sortBy,
  };
};
