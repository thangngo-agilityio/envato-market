'use client'; //TODO: check server render later

import { memo, useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// Components
import { Box, Flex, Text } from '@chakra-ui/react';
import { Button, InputField, Select } from '@/ui/components';

// Hooks
import { useDebounce } from '@/lib/hooks';

// Icons
import { Search, ChevronIcon } from '@/ui/components/Icons';

// Constants
import { FILTER_USER_OPTIONS } from '@/lib/constants';

// Types
import { TOption } from '@/ui/components/common/Select';

// Mock
import { INITIAL_USER, USERS_MOCK } from '@/lib/mocks';

// Lazy loading components
const UsersTable = dynamic(() => import('@/ui/components/UsersTable'));
const UserCard = dynamic(() => import('@/ui/components/UserCard'));

const Users = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [seniorityLevel, setSeniorityLevel] = useState<string>('');

  // TODO: Update call API later
  // const {
  //   data: users = [],
  //   isLoading: isEmployeesLoading,
  //   isError: isEmployeesError,
  // } = useEmployee('');

  const handleClickUser = useCallback((id: string) => {
    setUserId(id);
  }, []);

  const user = useMemo(
    () =>
      userId ? USERS_MOCK.find((user) => user.id === userId) : USERS_MOCK[0],
    [userId],
  );

  const renderTitle = useCallback(
    ({ label }: TOption) => (
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{label}</Text>
        <ChevronIcon />
      </Flex>
    ),
    [],
  );

  //TODO: update search later
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchUsersByJobTitle = useDebounce((value: string) => {
    // setSearchParam('jobTitle', value);
  }, []);

  const handleFilterUsersBySeniorLevel = useCallback((data: TOption) => {
    setSeniorityLevel(data.value);
  }, []);

  const usersFiltered = useMemo(
    () =>
      seniorityLevel
        ? USERS_MOCK.filter((item) => item.level === seniorityLevel)
        : USERS_MOCK,
    [seniorityLevel],
  );

  return (
    <Flex
      p={12}
      bgColor="background.body.tertiary"
      minH="calc(100vh - 112px)"
      gap={11}
      direction={{ base: 'column', '3xl': 'row' }}
    >
      <Box flex={{ '3xl': 3 }}>
        <Flex
          p={{
            base: 1,
            md: 4,
          }}
          rounded="lg"
          bg="background.body.quaternary"
          mb={8}
          alignItems="center"
        >
          <InputField
            flex={4}
            variant="no-focus"
            leftIcon={<Search color="#94A3B8" />}
            placeholder="Job Title"
            sx={{
              svg: {
                position: 'absolute',
              },
            }}
            onChange={handleSearchUsersByJobTitle}
          />
          <Flex gap={8}>
            <Box
              w={220}
              px={5}
              borderRight="solid 1px"
              borderLeft="solid 1px"
              borderColor="border.primary"
              display={{ base: 'none', xl: 'block' }}
            >
              <Select
                options={FILTER_USER_OPTIONS}
                variant="no-background"
                renderTitle={renderTitle}
                onSelect={handleFilterUsersBySeniorLevel}
              />
            </Box>
            <Button
              size="md"
              aria-label="btn-search"
              bg="background.component.quaternary"
              fontWeight="medium"
              sx={{
                py: 7,
                borderRadius: 'lg',
                display: { base: 'none', md: 'inline-flex' },
                _hover: {
                  bg: 'background.component.quaternary',
                },
              }}
            >
              Search
            </Button>
          </Flex>
        </Flex>
        <UsersTable users={usersFiltered} onClickUser={handleClickUser} />
      </Box>
      <Box flex={1} pt={20}>
        <UserCard user={user || INITIAL_USER} />
      </Box>
    </Flex>
  );
};

const UsersPage = memo(Users);

export default UsersPage;
