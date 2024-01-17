'use client';

import { memo } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Control } from 'react-hook-form';

// Hooks
import { useForm, useWallet } from '@/lib/hooks';

// Components
import { UserSelector } from './UserSelector';
import { EnterMoney } from './EnterMoney';
import CardBalance from './CardBalance';

// Stores
import { authStore } from '@/lib/stores';

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
  onSubmit = () => {},
}: CardPaymentProps): JSX.Element => {
  const user = authStore((state) => state.user);

  const { control, handleSubmit } = useForm<TTransfer>({
    defaultValues: {
      money: '',
      userId: '',
    },
  });

  const { currentWalletMoney } = useWallet(user?.id);

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

      <CardBalance balance={currentWalletMoney?.balance || 0} />

      <Box as="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
        <UserSelector control={control} />
        <EnterMoney control={control} />
      </Box>
    </Box>
  );
};

const CardPayment = memo(CardPaymentComponent);

export default CardPayment;
