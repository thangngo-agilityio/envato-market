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
import { QueryProvider } from '@/ui/providers';
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
    deleteNotification,
    updateNotification,
  } = useNotification(user?.id);

  const handleCloseModal = () => handleToggleModal();

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
            toast(
              customToast(
                SUCCESS_MESSAGES.DELETE_NOTIFICATION_SUCCESS.title,
                SUCCESS_MESSAGES.DELETE_NOTIFICATION_SUCCESS.description,
                STATUS.SUCCESS,
              ),
            );
            handleCloseModal();
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
    [deleteNotification, handleCloseModal],
  );

  const handleDeleteData = () => {
    handleDeleteNotification(currentNotificationId);
  };

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
                {data.map((item: TNotification, index) => {
                  const isLastItem = index === data.length - 1;
                  const isAddMoney = item.type === TYPE.ADD_MONEY;

                  return (
                    <NotificationItem
                      key={item._id}
                      notification={item}
                      isAddMoney={isAddMoney}
                      isLastItem={isLastItem}
                      onToggleModal={handleToggleModal}
                      onUpdateNotification={handleUpdateNotification}
                    />
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
          body={
            <Box>
              <Text fontSize="lg">{CONFIRM_MESSAGE.DELETE_NOTIFICATION}</Text>
              <Flex my={4} justifyContent="center">
                <Button w={44} bg="green.600" mr={3} onClick={handleDeleteData}>
                  Delete
                </Button>
                <Button
                  w={44}
                  bg="orange.300"
                  _hover={{ bg: 'orange.400' }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          }
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

const WrappedNotification = (props: NotificationProps) => (
  <QueryProvider>
    <NotificationComponent {...props} />
  </QueryProvider>
);

const Notification = memo(WrappedNotification);
export default Notification;
