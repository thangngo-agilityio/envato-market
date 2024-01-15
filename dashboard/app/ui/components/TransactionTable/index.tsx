'use client';

import { Box, Td, Text, Th } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';

// Components
import {
  Table,
  Pagination,
  CustomerNameCell,
  HeadCell,
  SearchBar,
  StatusCell,
  Fetching,
  ActionCell,
} from '@/ui/components';

// Utils
import {
  formatUppercaseFirstLetter,
  getTransactionHomePage,
} from '@/lib/utils';

// Hooks
import {
  TSortField,
  useDebounce,
  usePagination,
  useSearch,
  useTransactions,
} from '@/lib/hooks';

// Constants
import {
  COLUMNS_DASHBOARD,
  COLUMNS_HISTORY,
  STATUS_LABEL,
} from '@/lib/constants';

// Types
import { TDataSource, THeaderTable, TTransaction } from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

// Providers
import { QueryProvider } from '@/ui/providers';
import { TYPE } from '@/lib/constants/notification';

interface TFilterUserProps {
  isOpenHistoryModal?: boolean;
  isTableHistory?: boolean;
}

const TransactionTableComponent = ({
  isOpenHistoryModal = false,
}: TFilterUserProps) => {
  const { get, setSearchParam: setSearchTransaction } = useSearch();

  const { user } = authStore();

  const {
    data: transactions = [],
    dataHistory,
    dataTransaction,
    isLoading: isLoadingTransactions,
    isError: isTransactionsError,
    sortBy,
  } = useTransactions(
    {
      name: get('name') || '',
    },
    user?.id,
  );

  const listData = isOpenHistoryModal ? dataHistory : dataTransaction;

  const {
    data,
    filterData,
    arrOfCurrButtons,
    isDisabledPrev,
    isDisableNext,
    resetPage,
    handleChangeLimit,
    handlePageChange,
    handlePageClick,
  } = usePagination(listData);

  // Update search params when end time debounce
  const handleDebounceSearch = useDebounce((value: string) => {
    resetPage();
    setSearchTransaction('name', value);
  }, []);

  const renderHead = useCallback(
    (title: string, key: string): JSX.Element => {
      const handleClick = () => {
        sortBy && sortBy(key as TSortField);
      };

      if (!title) return <Th w={50} maxW={50} />;

      return <HeadCell key={title} title={title} onClick={handleClick} />;
    },
    [sortBy],
  );

  const renderNameUser = useCallback(
    ({ id, image, name }: TDataSource): JSX.Element => (
      <CustomerNameCell id={id} key={id} image={image} name={name} />
    ),
    [],
  );

  type TStatus = keyof typeof STATUS_LABEL;

  const renderPaymentStatus = useCallback(
    ({ paymentStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${paymentStatus}` as TStatus]}
        text={paymentStatus as string}
      />
    ),
    [],
  );

  const renderTransactionStatus = useCallback(
    ({ transactionStatus }: TDataSource): JSX.Element => (
      <StatusCell
        variant={STATUS_LABEL[`${transactionStatus}` as TStatus]}
        text={transactionStatus as string}
      />
    ),
    [],
  );

  const renderActionIcon = useCallback(
    (data: TTransaction) => (
      <ActionCell
        key={`${data._id}-action`}
        // TODO: Will update later
        // isOpenModal={!isOpenHistoryModal}
        // transaction={data}
        // onDeleteTransaction={handleDeleteTransaction}
        // onUpdateTransaction={handleUpdateTransaction}
      />
    ),
    [],
  );

  const renderRole = useCallback(
    ({ customer: { role } }: TTransaction): JSX.Element => (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          noOfLines={1}
          w={{ base: 100, md: 150, '6xl': 250 }}
          flex={1}
        >
          {formatUppercaseFirstLetter(role)}
        </Text>
      </Td>
    ),
    [],
  );

  const renderSpent = useCallback(({ amount, type }: TTransaction) => {
    const isAddMoney = type === TYPE.ADD_MONEY;

    return (
      <Td
        py={5}
        pr={5}
        pl={0}
        fontSize="md"
        color="text.primary"
        fontWeight="semibold"
        textAlign="left"
        w={{ base: 150, md: 20 }}
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          whiteSpace="break-spaces"
          color={isAddMoney ? 'text.primary' : 'red.500'}
          noOfLines={1}
          w={{ base: 100, md: 150, '7xl': 300 }}
          flex={1}
        >
          {amount}
        </Text>
      </Td>
    );
  }, []);

  const columns = useMemo(() => {
    if (isOpenHistoryModal) {
      return COLUMNS_HISTORY(
        renderHead,
        renderNameUser,
        renderPaymentStatus,
        renderTransactionStatus,
        renderActionIcon,
      );
    }
    return COLUMNS_DASHBOARD(
      renderHead,
      renderRole,
      renderNameUser,
      renderActionIcon,
      renderSpent,
    );
  }, [
    isOpenHistoryModal,
    renderActionIcon,
    renderHead,
    renderNameUser,
    renderPaymentStatus,
    renderRole,
    renderSpent,
    renderTransactionStatus,
  ]);

  return (
    <>
      <SearchBar
        searchValue={get('name') || ''}
        onSearch={handleDebounceSearch}
      />
      <Fetching isLoading={isLoadingTransactions} isError={isTransactionsError}>
        <Box mt={5}>
          <Table
            columns={columns as THeaderTable[]}
            dataSource={getTransactionHomePage(filterData)}
          />
        </Box>
        {!!transactions.length && (
          <Box mt={8}>
            <Pagination
              pageSize={data.limit}
              currentPage={data.currentPage}
              isDisabledPrev={isDisabledPrev}
              isDisableNext={isDisableNext}
              arrOfCurrButtons={arrOfCurrButtons}
              onLimitChange={handleChangeLimit}
              onPageChange={handlePageChange}
              onClickPage={handlePageClick}
            />
          </Box>
        )}
      </Fetching>
    </>
  );
};

const WrappedTransactionTable = () => (
  <QueryProvider>
    <TransactionTableComponent />
  </QueryProvider>
);

const TransactionTable = memo(WrappedTransactionTable, isEqual);

export default TransactionTable;
