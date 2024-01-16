import { memo, useMemo } from 'react';

// Components
import { Box, Button, Flex, Text } from '@chakra-ui/react';

// Constants
import { STATUS_SUBMIT } from '@/lib/constants';

// Interfaces
import { TCustomer, TTransaction } from '@/lib/interfaces';

interface TransactionProps {
  isDelete?: boolean;
  transaction: Partial<TTransaction & TCustomer & { id: string }>;
  onDeleteTransaction?: () => void;
  onUpdateTransaction?: (transactionData: TTransaction) => void;
  onCloseModal?: () => void;
}

const TransactionModal = ({
  isDelete = false,
  transaction,
  onDeleteTransaction = () => {},
  onCloseModal = () => {},
}: TransactionProps) => {
  const disabled = useMemo(() => status === STATUS_SUBMIT.PENDING, []);

  return isDelete ? (
    <Box>
      <Text fontSize="lg">
        Are you sure delete the transaction with id:
        <Text as="span" pl={1} color="red.500" fontWeight="bold">
          {transaction?.id}
        </Text>
        ?
      </Text>
      <Flex my={4} justifyContent="center">
        <Button
          w={44}
          bg="green.600"
          mr={3}
          isDisabled={disabled}
          onClick={onDeleteTransaction}
        >
          Delete
        </Button>
        <Button
          w={44}
          bg="orange.300"
          _hover={{ bg: 'orange.400' }}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  ) : (
    // TODO: Implement UI for update transaction
    <></>
  );
};

const TransactionModalMemorized = memo(TransactionModal);
export default TransactionModalMemorized;
