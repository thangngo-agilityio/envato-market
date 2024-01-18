import { Box, Select, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Control, Controller } from 'react-hook-form';

// Icons
import { ChevronIcon } from '../Icons';

// Types
import { TTransfer } from '.';
import { TUserDetail } from '@/lib/interfaces';

export type TUseSelectorProps = {
  control: Control<TTransfer>;
  listUser?: Array<
    Omit<TUserDetail, 'id'> & {
      _id: string;
    }
  >;
};

const UserSelectorComponent = ({
  control,
  listUser = [],
}: TUseSelectorProps): JSX.Element => (
  <>
    <Text
      fontWeight="bold"
      color="text.primary"
      fontSize="lg"
      mb={3}
      textTransform="capitalize"
    >
      quick transfer
    </Text>

    <Box position="relative">
      <Controller
        control={control}
        name="memberId"
        defaultValue=""
        rules={{ required: true }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { onChange, ref: _, ...rest } }) => (
          <Select
            {...rest}
            size="lg"
            sx={{
              paddingLeft: '50px',
            }}
            borderColor="border.secondary"
            color="text.primary"
            icon={<ChevronIcon />}
            onChange={onChange}
          >
            <option selected hidden disabled value="">
              Choose an account to transfer
            </option>
            {listUser.map((user) => (
              <option key={user._id} value={user._id} color="text.primary">
                {user.email}
              </option>
            ))}
          </Select>
        )}
      />
    </Box>
  </>
);

const UserSelector = memo(UserSelectorComponent);

export default UserSelector;
