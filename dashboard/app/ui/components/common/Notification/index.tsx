'use client';

import { memo, useCallback, useState } from 'react';

// Components
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Bell, IconButton, Modal } from '@/ui/components';

// Utils
import { customToast } from '@/lib/utils/toast';

// Hooks
import { useNotification } from '@/lib/hooks';

// Constants
import {
  CONFIRM_MESSAGE,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
  TYPE,
} from '@/lib/constants';

// Interfaces
import { TNotification, TUserDetail } from '@/lib/interfaces';

// Utils
import { NotificationItem } from './Body';

interface NotificationProps {
  colorFill: string;
  user: TUserDetail;
}

const NotificationComponent = ({ colorFill, user }: NotificationProps) => {
  const toast = useToast();

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [currentNotificationId, setCurrentNotificationId] =
    useState<string>('');

  const handleToggleModal = useCallback(
    (event?: React.MouseEvent<SVGElement, MouseEvent>, id?: string) => {
      event?.stopPropagation();
      setCurrentNotificationId(id as string);
      setIsOpenConfirmModal(!isOpenConfirmModal);
    },
    [isOpenConfirmModal],
  );

  const {
    data,
    quantity,
    hasNewNotification,
    isDeleteNotification,
    deleteNotification,
    updateNotification,
  } = useNotification(user?.id);

  const handleTriggerToggleModal = () => handleToggleModal();

  const handleUpdateNotification = useCallback(
    (updateData: TNotification) => {
      updateNotification({
        userId: user?.id,
        notificationId: updateData._id,
        isMarkAsRead: true,
      });
    },
    [updateNotification],
  );

  const handleDeleteNotification = useCallback(
    (id?: string) => {
      deleteNotification(
        {
          userId: user?.id,
          notificationId: id,
        },
        {
          onSuccess: () => {
            handleTriggerToggleModal();
            toast(
              customToast(
                SUCCESS_MESSAGES.DELETE_NOTIFICATION_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_NOTIFICATION_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
          },
          onError: () => {
            toast(
              customToast(
                ERROR_MESSAGES.DELETE_NOTIFICATION.title,
                ERROR_MESSAGES.DELETE_NOTIFICATION.description,
                STATUS.ERROR,
              ),
            );
          },
        },
      );
    },
    [deleteNotification, handleTriggerToggleModal],
  );

  const handleDeleteData = () => {
    handleDeleteNotification(currentNotificationId);
  };

  const modalContent = (): JSX.Element => (
    <Box>
      <Text fontSize="lg">{CONFIRM_MESSAGE.DELETE_NOTIFICATION}</Text>
      <Flex my={4} justifyContent="center">
        <Button
          w={44}
          bg="green.600"
          mr={3}
          isDisabled={isDeleteNotification}
          onClick={handleDeleteData}
        >
          Delete
        </Button>
        <Button
          w={44}
          bg="orange.300"
          _hover={{ bg: 'orange.400' }}
          onClick={handleTriggerToggleModal}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );

  return (
    <>
      <Menu placement="auto" closeOnSelect={false}>
        {({ isOpen }) => (
          <Box>
            <MenuButton
              as={Button}
              p={0}
              bg="none"
              _hover={{
                bg: 'none',
              }}
              _active={{
                bg: 'none',
              }}
              isActive={isOpen}
              lineHeight="inherit"
            >
              <IconButton
                ariaLabel="new-notification"
                hasNewNotification={hasNewNotification}
                quantityNotification={quantity}
              >
                <Bell color={colorFill} />
              </IconButton>
            </MenuButton>
            <MenuList
              mt={5}
              w={{ base: 300, lg: 435 }}
              overflow="hidden"
              px={3.5}
              border="none"
              borderRadius="lg"
              bg="background.component.primary"
            >
              <Text fontSize="xl" fontWeight="bold" m={4}>
                Notifications
              </Text>
              <Flex
                flexDirection="column"
                mt={3}
                maxH={320}
                overflowY="scroll"
                css={{
                  '&::-webkit-scrollbar': {
                    width: 2,
                  },
                  '&::-webkit-scrollbar-track': {
                    width: 2,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray',
                    borderRadius: '24px',
                  },
                }}
              >
                {data?.map((item: TNotification, index) => {
                  const isLastItem = index === data.length - 1;
                  const isAddMoney = item.type === TYPE.ADD_MONEY;

                  return (
                    <Box key={item._id} data-testid="notification-item">
                      <NotificationItem
                        notification={item}
                        isAddMoney={isAddMoney}
                        isLastItem={isLastItem}
                        onToggleModal={handleToggleModal}
                        onUpdateNotification={handleUpdateNotification}
                      />
                    </Box>
                  );
                })}
              </Flex>
            </MenuList>
          </Box>
        )}
      </Menu>
      {isOpenConfirmModal && (
        <Modal
          title="Delete Notification"
          isOpen={isOpenConfirmModal}
          haveCloseButton
          body={modalContent()}
          onClose={handleTriggerToggleModal}
        />
      )}
    </>
  );
};

// const WrappedNotification = (props: NotificationProps) => (
//   <QueryProvider>
//     <NotificationComponent {...props} />
//   </QueryProvider>
// );

const Notification = memo(NotificationComponent);
export default Notification;
