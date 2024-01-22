import { ReactNode, memo, useMemo } from 'react';
import { Box, Divider, Flex } from '@chakra-ui/react';

// Components
import { Benefit, Logo, SwitchTheme } from '@/ui/components';
import Heading from '@/ui/layouts/AuthHeader';

// Layouts
import { AuthFooter } from '@/ui/layouts';

// Constants
import { TITLES } from '@/lib/constants';

type TAuthLayoutProps = {
  children?: ReactNode;
  isSignInForm?: boolean;
  isForgotPasswordPage?: boolean;
};

const AuthLayoutComponent = ({
  children,
  isSignInForm = true,
  isForgotPasswordPage = false,
}: TAuthLayoutProps): JSX.Element => {
  console.log('isForgotPasswordPage', isForgotPasswordPage);

  const title: string = useMemo(
    (): string =>
      isForgotPasswordPage
        ? TITLES.FORGOT_PASSWORD
        : isSignInForm
          ? TITLES.SIGN_IN
          : TITLES.SIGN_UP,
    [isForgotPasswordPage, isSignInForm],
  );

  return (
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
        <Box
          w={{
            base: '100%',
            sm: 425,
            md: 460,
          }}
          margin="auto"
          pt={24}
          pb={16}
          px={5}
          sx={{
            boxSizing: {
              base: 'border-box',
              md: 'unset',
            },
          }}
        >
          <Heading title={title} isForgotPasswordPage={isForgotPasswordPage} />
          <Divider content={!isForgotPasswordPage ? TITLES.AUTH_DiVIDER : ''} />
          {children}
          <AuthFooter />
        </Box>
      </Box>
      {!isForgotPasswordPage && <Benefit />}
    </Flex>
  );
};

const AuthLayout = memo(AuthLayoutComponent);

export default AuthLayout;
