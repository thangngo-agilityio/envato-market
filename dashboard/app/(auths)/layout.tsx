'use client';

import isEqual from 'react-fast-compare';
import { ReactNode, memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';

// Constants
import { IMAGES, ROUTES, TITLES } from '@/lib/constants';

// Components
import { Box, Flex } from '@chakra-ui/react';
import { Benefit, Divider, Logo, SwitchTheme } from '@/ui/components';

// Types
import { TImageDetails } from '@/lib/interfaces';
import { AuthFooter, AuthHeader } from '@/ui/layouts';

type TAuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayoutComponent = ({ children }: TAuthLayoutProps): JSX.Element => {
  const pathname = usePathname();

  const isSignInForm = pathname === `/${ROUTES.LOGIN}`;

  const title: string = useMemo(
    (): string => (isSignInForm ? TITLES.SIGN_IN : TITLES.SIGN_UP),
    [isSignInForm],
  );
  const { url, alt, width, height }: TImageDetails = useMemo(
    (): TImageDetails => (isSignInForm ? IMAGES.SIGN_IN : IMAGES.SIGN_UP),
    [isSignInForm],
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
          <AuthHeader title={title} />
          <Divider content={TITLES.AUTH_DiVIDER} />
          {children}
          <AuthFooter />
        </Box>
      </Box>
      <Benefit
        image={{ url: url, width: width, height: height }}
        alt={alt}
        heading="Speady, Easy and Fast"
      />
    </Flex>
  );
};
const AuthLayout = memo(AuthLayoutComponent, isEqual);

export default AuthLayout;
