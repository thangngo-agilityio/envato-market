import { useState, useCallback, useId } from 'react';
import { VStack, Flex, Text } from '@chakra-ui/react';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';

// Components
import { InputField, SendIconLight } from '..';
import CustomButton from '../common/Button';

// Interfaces
import { TMessages } from '@/lib/interfaces';

// Stores
import { authStore } from '@/lib/stores';

// Utils
// import { adminSendMessage } from '@app/utils';

// Hooks
import { getUserList } from '@/lib/hooks';
import { adminSendMessage } from '@/lib/firebase';

interface QuillProps {
  userUid: string | undefined;
}

const Quill = ({ userUid }: QuillProps) => {
  const user = authStore((state) => state.user);
  const [isSubmit] = useState<boolean>(false);

  // TODO: get from list users
  // const senderId = user?.id || '';

  // TODO: if have real id from database
  // const idRoomChat = useGetRoomChat();

  const {
    control,
    formState: {
      errors: { root },
      isValid,
      isSubmitting,
    },
    handleSubmit,
    reset,
  } = useForm<TMessages>({
    defaultValues: {
      text: '',
      id: useId(),
      senderId: user?.uid,
      date: { nanoseconds: 0, seconds: 0 },
    },
    mode: 'onBlur',
  });

  const handleSend = useCallback(
    async (data: TMessages) => {
      const usersData = await getUserList(user);

      const userChat = usersData.find((item) => item.uid === userUid);

      if (usersData) {
        const idRoomChat = `${user?.uid}${userChat?.uid}`;
        const adminId = user?.uid as string;

        await adminSendMessage(data, idRoomChat, adminId);

        reset();
      }
    },
    [reset, user, userUid],
  );

  return (
    <VStack as="form" onSubmit={handleSubmit(handleSend)}>
      <Flex direction="column" width="full">
        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, ...rest } }) => (
            <Flex direction="row" alignItems="center">
              <Flex
                width="full"
                alignItems="center"
                justify="flex-start"
                borderWidth={1}
                borderRadius={5}
                sx={{
                  borderColor: 'primary.300',
                }}
              >
                <InputField
                  placeholder="Type your message..."
                  _placeholder={{
                    color: 'secondary.450',
                  }}
                  {...rest}
                  isDisabled={isSubmit}
                  onChange={onChange}
                />
              </Flex>
              <CustomButton
                w="unset"
                px={4}
                ml={4}
                py={2.5}
                leftIcon={<SendIconLight />}
                fontSize="md"
                fontWeight="semibold"
                bgColor="primary.600"
                alignSelf="flex-end"
                type="submit"
                isDisabled={!isValid || isSubmitting}
              >
                Send
              </CustomButton>
            </Flex>
          )}
        />

        <Text color="red" textAlign="center" py={2} h={10}>
          {root?.message}
        </Text>
      </Flex>
    </VStack>
  );
};

export default Quill;
