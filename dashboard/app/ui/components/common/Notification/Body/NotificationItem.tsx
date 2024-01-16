import { memo } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Divider, Flex, MenuItem, Text } from '@chakra-ui/react';

// Constants
import { TYPE } from '@/lib/constants';

// Interfaces
import { TNotification } from '@/lib/interfaces';

// Utils
import { convertDateToTime } from '@/lib/utils';

interface NotificationProps {
  notification: TNotification[];
  onToggleModal: (id: string, event: Element) => void;
  onUpdateNotification: (item: TNotification) => void;
}

const NotificationItem = ({
  notification,
  onToggleModal,
  onUpdateNotification,
}: NotificationProps) =>
  notification?.map((item: TNotification, index) => {
    const isLastItem = index === notification.length - 1;
    const isAddMoney = item.type === TYPE.ADD_MONEY;

    const handleUpdateData = () => onUpdateNotification(item);

    return (
      <MenuItem
        key={item._id}
        py={0}
        bg={item.isMarkAsRead ? 'transparent' : 'background.component.tertiary'}
        _hover={{
          bg: 'background.component.tertiary',
          color: 'text.currencyColor',
        }}
      >
        <Flex flexDirection="column" w="full">
          <Flex alignItems="center" justifyContent="space-between">
            <Box
              {...(!item.isMarkAsRead
                ? { onClick: handleUpdateData }
                : { cursor: 'not-allowed' })}
            >
              <Text fontSize="sm" color="text.nonary" mt={2}>
                <Text as="span" fontWeight="bold" pr={1} fontSize="sm">
                  {item?.sender}
                </Text>
                {item?.content}
                {!isAddMoney && (
                  <Text as="span" fontWeight="bold" fontSize="sm">
                    &nbsp;{item.receiver}
                  </Text>
                )}
                &nbsp;totaling
                <Text
                  as="span"
                  color={isAddMoney ? 'text.currencyColor' : 'red.500'}
                  px={1}
                  fontSize="sm"
                >
                  ${item.amount}
                </Text>
              </Text>
              <Text fontSize="xs" color="text.textTime" mt={2} mb={3}>
                {convertDateToTime(item.createdAt as string)}
              </Text>
            </Box>
            <DeleteIcon
              position="relative"
              zIndex={10}
              data-testid="delete-icon"
              onClick={(event) =>
                onToggleModal(item._id, event as unknown as Element)
              }
            />
          </Flex>
          {!isLastItem && <Divider color="gray.300" />}
        </Flex>
      </MenuItem>
    );
  });

const NotificationMemorize = memo(NotificationItem);

export default NotificationMemorize;
