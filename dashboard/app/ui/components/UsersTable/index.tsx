import { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import Link from 'next/link';

// Components
import { Box, Button, Td, Text } from '@chakra-ui/react';
import {
  Table,
  UserInfoCell,
  ActionCell,
  Pagination,
  Fetching,
  StatusCell,
} from '@/ui/components';

// Constants
import { ROUTES, STATUS_LABEL } from '@/lib/constants';

// Interfaces
import {
  TDataSource,
  PaginationType,
  THeaderTable,
  Status,
  TUserDetail,
} from '@/lib/interfaces';
import { TOption } from '../common/Select';

// Utils
import { formatUserResponse } from '@/lib/utils';

type TUsersProps = {
  users: TUserDetail[];
  data?: PaginationType;
  arrOfCurrButtons?: (string | number)[];
  isDisabledPrev?: boolean;
  isDisableNext?: boolean;
  isLoadingUser?: boolean;
  isUserError?: boolean;
  onChangeLimit: (limit: TOption) => void;
  onPageChange: (direction: string) => void;
  onPageClick: (value: number) => void;
  onClickUser?: (id: string) => void;
  onLockUser: (user?: TUserDetail) => void;
  onUnlockUser: (user?: TUserDetail) => void;
};

const UsersComponent = ({
  users,
  data,
  arrOfCurrButtons = [],
  isDisableNext,
  isDisabledPrev,
  isLoadingUser,
  isUserError,
  onChangeLimit,
  onPageChange,
  onPageClick,
  onLockUser,
  onUnlockUser,
  onClickUser = () => {},
}: TUsersProps): JSX.Element => {
  const renderHead = useCallback((): JSX.Element => <></>, []);

  const columns = [
    {
      key: 'info',
      renderHead: renderHead,
      renderBody: ({ name, image, email }: TDataSource): JSX.Element => (
        <UserInfoCell
          name={name as string}
          imageURL={image as string}
          email={email as string}
        />
      ),
    },
    {
      renderHead,
      renderBody: ({ createdAt }: TDataSource) => (
        <Td
          py={5}
          pr={{ base: 300, xl: 70, '3xl': 200 }}
          pl={0}
          fontSize="md"
          color="text.primary"
          fontWeight="semibold"
          textAlign="left"
        >
          <Text>{createdAt as string}</Text>
        </Td>
      ),
    },
    {
      renderHead,
      renderBody: ({ isBlock }: TDataSource) => (
        <StatusCell
          mr={{ base: 80, xl: 20, '3xl': 40 }}
          variant={
            isBlock ? STATUS_LABEL[Status.LOCK] : STATUS_LABEL[Status.UNLOCK]
          }
          text={isBlock ? Status.LOCK : Status.UNLOCK}
        />
      ),
    },
    {
      renderHead,
      renderBody: () => (
        <Td
          py={5}
          pr={{ base: 5, xl: 10 }}
          pl={0}
          fontSize="md"
          color="text.primary"
          fontWeight="semibold"
          textAlign="left"
          w={20}
        >
          <Button as={Link} href={`/${ROUTES.INBOX}`} w={250} bg="primary.300">
            Message
          </Button>
        </Td>
      ),
    },
    {
      key: 'actions',
      renderHead,
      renderBody: (user: TUserDetail) => (
        <ActionCell
          isOpenModal
          isOpenUserAction
          user={user}
          onLockUser={onLockUser}
          onUnlockUser={onUnlockUser}
        />
      ),
    },
  ];

  return (
    <Fetching isLoading={isLoadingUser} isError={isUserError}>
      <Table
        variant="secondary"
        columns={columns as THeaderTable[]}
        dataSource={formatUserResponse(users)}
        onClickTableRow={onClickUser}
      />
      {!!users?.length && (
        <Box mt={8}>
          <Pagination
            pageSize={data?.limit}
            currentPage={data?.currentPage}
            isDisabledPrev={isDisabledPrev}
            isDisableNext={isDisableNext}
            arrOfCurrButtons={arrOfCurrButtons}
            onLimitChange={onChangeLimit}
            onPageChange={onPageChange}
            onClickPage={onPageClick}
          />
        </Box>
      )}
    </Fetching>
  );
};

const Users = memo(UsersComponent, isEqual);

export default Users;
