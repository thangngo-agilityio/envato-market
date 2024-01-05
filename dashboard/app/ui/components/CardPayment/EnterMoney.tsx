import { memo } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

// Components
import { TTransferControl } from '.';

// Utils
import { formatDecimalInput } from '@/lib/utils';

const EnterMoneyComponent = ({ control }: TTransferControl): JSX.Element => (
  <>
    <Box
      border="1px solid"
      borderColor="border.secondary"
      p={4}
      mt={5}
      borderRadius="lg"
    >
      <Text color="text.secondary"> Enter amount </Text>
      <Flex direction="row" alignItems="center">
        <Text color="text.primary" fontSize="2xl" fontWeight="bold">
          $
        </Text>
        <Controller
          control={control}
          name="money"
          render={({ field: { value, onChange } }) => {
            const handleChange = (
              event: React.ChangeEvent<HTMLInputElement>,
            ) => {
              const value: string = event.target.value;

              // Remove non-numeric characters and leading zeros
              const sanitizedValue = formatDecimalInput(value);

              onChange(sanitizedValue);
            };

            return (
              <Input
                variant="authentication"
                type="text"
                _dark={{
                  border: 'none',
                }}
                sx={{ border: 'none', padding: 0 }}
                color="text.primary"
                fontWeight="bold"
                fontSize="2xl"
                ml={2}
                value={value}
                name="money"
                onChange={handleChange}
              />
            );
          }}
        />
      </Flex>
    </Box>

    <Button
      aria-label="btn-send-money"
      mt={4}
      colorScheme="primary"
      fontWeight="bold"
      type="submit"
    >
      Send Money
    </Button>
  </>
);

export const EnterMoney = memo(EnterMoneyComponent);
