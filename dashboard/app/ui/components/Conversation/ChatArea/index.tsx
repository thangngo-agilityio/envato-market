import {
  Flex,
  FormControl,
  Text,
  VStack,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { Controller, SubmitHandler } from 'react-hook-form';
import isEqual from 'react-fast-compare';
import ReactQuill from 'react-quill';
import { memo, useCallback } from 'react';

// Components
import CustomButton from '../../common/Button';
import { SendIconLight } from '../..';

// Hooks
import { useForm } from '@/lib/hooks';

// Types
import { TChat } from '@/lib/interfaces';

// Themes
import { colors } from '@/ui/themes/bases';

type TChatAreaProps = {
  onSendMessage: (data: TChat) => void;
};

const ChatArea = ({ onSendMessage }: TChatAreaProps): JSX.Element => {
  const {
    control,
    formState: {
      errors: { root },
    },
    handleSubmit,
    reset,
  } = useForm<TChat>({
    defaultValues: {
      messages: '',
    },
    mode: 'onBlur',
  });

  const colorFill = useColorModeValue(
    theme.colors.white,
    colors.secondary[400],
  );

  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();

        handleSubmit(onSendMessage)();
        reset();
      }
    },
    [handleSubmit, onSendMessage, reset],
  );

  const handleSubmitMessage: SubmitHandler<TChat> = useCallback(
    (chat) => {
      onSendMessage(chat);
      reset();
    },
    [onSendMessage, reset],
  );

  return (
    <VStack as="form" onSubmit={handleSubmit(handleSubmitMessage)}>
      <Flex direction="column" width="full">
        <Controller
          control={control}
          name="messages"
          render={({ field: { onChange, ...rest } }) => (
            <FormControl>
              <Flex direction="row" alignItems="center" justify="flex-start">
                <ReactQuill
                  {...rest}
                  onKeyDown={handleOnKeyDown}
                  onChange={onChange}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block'],
                    ],
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: colorFill,
                  }}
                  theme="snow"
                />
              </Flex>
            </FormControl>
          )}
        />

        <Text color="red" textAlign="center" py={2} h={10}>
          {root?.message}
        </Text>

        <CustomButton
          w="unset"
          px={4}
          py={2.5}
          leftIcon={<SendIconLight />}
          fontSize="md"
          fontWeight="semibold"
          bgColor="primary.600"
          mt={4}
          alignSelf="flex-end"
          type="submit"
        >
          Send
        </CustomButton>
      </Flex>
    </VStack>
  );
};

const ChatAreaMemoried = memo(ChatArea, isEqual);

export default ChatAreaMemoried;
