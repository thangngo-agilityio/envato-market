'use client';

import { useColorModeValue, theme } from '@chakra-ui/react';
import Link from 'next/link';

// Assets
import { LogoIcon } from '@/ui/components';

const Logo = () => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  return (
    <Link as="h1" aria-label="link-to-home" href="/">
      <LogoIcon colorFill={colorFill} />
    </Link>
  );
};

export default Logo;
