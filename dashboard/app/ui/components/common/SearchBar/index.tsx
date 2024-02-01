import { FormEventHandler, memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, HStack } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';
import isEqual from 'react-fast-compare';

// Components
import { InputField, Select, Selector } from '@/ui/components';

//Mocks
import { MONTHS_OPTIONS } from '@/lib/constants';

// Types
import { TOption } from '@/ui/components/common/Select';
import { CloseIcon, Search2Icon } from '@chakra-ui/icons';

export type TSearchValue = {
  search: string;
};

type TSearchProps = {
  searchValue: string;
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
};

const SearchBarComponent = ({
  searchValue,
  onSearch,
  onFilter,
}: TSearchProps): JSX.Element => {
  const renderTitleSelector = useCallback(() => <Selector />, []);

  // Form control for search
  const { control, resetField } = useForm<TSearchValue>({
    defaultValues: {
      search: searchValue,
    },
  });

  const handleSelectMonth = useCallback(
    ({ value }: TOption) => onFilter && onFilter(value),
    [onFilter],
  );

  const handleResetValue = useCallback(() => {
    resetField('search');
    onSearch('');
  }, [onSearch]);

  const handleStopSubmitForm: FormEventHandler<HTMLDivElement> = useCallback(
    (e) => e.preventDefault(),
    [],
  );

  return (
    <HStack
      as="form"
      data-testid="search-bar"
      h={14}
      gap={{
        base: 'none',
        sm: '5',
      }}
      onSubmit={handleStopSubmitForm}
    >
      <Box
        display={{
          base: 'flex',
          sm: 'block',
        }}
        flex={1}
      >
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onChange } }) => (
            <InputField
              value={value}
              onChange={(value: string) => {
                onChange(value);
                onSearch(value);
              }}
              placeholder="Search by name, email, or other..."
              variant="secondary"
              leftIcon={<Search2Icon />}
              rightIcon={value && <CloseIcon onClick={handleResetValue} />}
              data-testid="search-transaction"
            />
          )}
        />
      </Box>
      <Box
        h="100%"
        w={{
          base: '45%',
          sm: '30%',
          lg: '15%',
          xl: '12%',
        }}
      >
        <Select
          options={MONTHS_OPTIONS}
          renderTitle={renderTitleSelector}
          onSelect={handleSelectMonth}
        />
      </Box>
    </HStack>
  );
};

const SearchBar = memo(SearchBarComponent, isEqual);

export default SearchBar;
