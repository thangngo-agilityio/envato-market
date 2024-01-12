import { ReactNode, memo } from 'react';

// Components
import { Box, Flex } from '@chakra-ui/react';
import { Benefit, Logo, SwitchTheme } from '@/ui/components';

type TAuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayoutComponent = ({ children }: TAuthLayoutProps): JSX.Element => (
  <Flex width="100%" minH="100vh">
    <Box
      as="section"
      p="40px 0 48px"
      flex={1}
      w={{
        base: '100%',
        md: 'unset',
      }}
      bg="background.body.secondary"
    >
      <Flex justifyContent="space-between" px={12}>
        <Logo />
        <SwitchTheme />
      </Flex>
      {children}
    </Box>
    <Benefit />
  </Flex>
);
const AuthLayout = memo(AuthLayoutComponent);

export default AuthLayout;
