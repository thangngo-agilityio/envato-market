'use client';

import { memo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Control } from 'react-hook-form';

// Hooks
import { useForm } from '@/lib/hooks';

// Components
import { CardBalance } from './CardBalance';
import { UserSelector } from './UserSelector';
import { EnterMoney } from './EnterMoney';

export interface CardPaymentProps {
  balance?: number;
  onSubmit?: () => void;
}
type TTransfer = {
  money: string;
  userId: string;
};
export type TTransferControl = {
  control: Control<TTransfer>;
};

const CardPaymentComponent = ({
  balance = 24098,
  onSubmit = () => {},
}: CardPaymentProps): JSX.Element => {
  const { control, handleSubmit } = useForm<TTransfer>({
    defaultValues: {
      money: '',
      userId: '',
    },
  });

  return (
    <Box
      p={4}
      w="full"
      bg="background.body.quaternary"
      py={{ base: 4, md: 5 }}
      px={{ base: 4, md: 10 }}
      borderRadius="lg"
    >
      <Heading
        as="h3"
        fontWeight="bold"
        color="text.primary"
        fontSize="lg"
        mb={3}
        textTransform="capitalize"
      >
        my wallet
      </Heading>

      <CardBalance balance={balance} />

      <Box as="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
        <UserSelector control={control} />
        <EnterMoney control={control} />
      </Box>
    </Box>
  );
};

const CardPayment = memo(CardPaymentComponent);

export default CardPayment;
