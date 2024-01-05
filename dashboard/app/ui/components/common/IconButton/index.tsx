import { memo } from 'react';
import { Box, IconButton } from '@chakra-ui/react';

interface IconButtonProps {
  children: JSX.Element;
  hasNewNotification?: boolean;
  isNotification?: boolean;
  onClick?: () => void;
}

const IconButtonComponent = ({
  children,
  hasNewNotification = false,
  isNotification = false,
  onClick,
}: IconButtonProps) => (
  <Box data-testid="icon-button-component" pos="relative" maxW="fit-content">
    {isNotification && (
      <Box
        pos="absolute"
        bg={hasNewNotification ? 'danger.500' : 'secondary.450'}
        rounded="full"
        boxSize="15px"
        textAlign="center"
        top="0px"
        right="-5px"
        fontSize="xs"
        zIndex={1}
        _light={{ border: 'solid 3px white' }}
      />
    )}
    <IconButton
      data-testid="icon-button"
      pos="relative"
      variant="iconPrimary"
      w="52px"
      h="52px"
      aria-label="Send email"
      icon={children}
      onClick={onClick}
    />
  </Box>
);

const CustomIconButton = memo(IconButtonComponent);
export default CustomIconButton;
