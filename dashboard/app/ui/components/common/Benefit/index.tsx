'use client';

import { memo, useMemo } from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

// Constants
import { IMAGES } from '@/lib/constants/images';
import { TImageDetails } from '@/lib/interfaces';
import { ROUTES } from '@/lib/constants';

const BenefitComponent = () => {
  const pathname = usePathname();
  const { url, alt, width, height }: TImageDetails = useMemo(
    (): TImageDetails =>
      pathname === `/${ROUTES.LOGIN}` ? IMAGES.SIGN_IN : IMAGES.SIGN_UP,
    [pathname],
  );
  return (
    <Flex
      w={width}
      p={20}
      minH="100vh"
      alignItems="center"
      position="relative"
      flexDirection="column"
      display={{ base: 'none', lg: 'block' }}
      backgroundColor="background.section.primary"
    >
      <Image src={url} alt={alt} w={width} height={height} />
      <Image
        position="absolute"
        top={10}
        left={8}
        src={IMAGES.SQUARE.url}
        alt={IMAGES.SQUARE.alt}
      />
      <Image
        position="absolute"
        top={14}
        right={12}
        src={IMAGES.VLINE.url}
        alt={IMAGES.VLINE.alt}
      />
      <Image
        position="absolute"
        bottom={1}
        left={8}
        src={IMAGES.DOTTED.url}
        alt={IMAGES.DOTTED.alt}
      />
      <Box
        fontFamily="primary"
        textAlign="center"
        m="0 auto"
        w={{ '2xl': '500px' }}
      >
        <Heading
          as="h2"
          variant="heading4Xl"
          marginBottom={4}
          color="text.primary"
        >
          Speady, Easy and Fast
        </Heading>

        <Text fontWeight="medium" fontSize="sm" textAlign="center">
          BankCo. help you set saving goals, earn cash back offers, Go to
          disclaimer for more details and get paychecks up to two days early.
          Get a
          <Text
            as="span"
            color="primary.500"
            paddingInline={1}
            fontWeight="bold"
            fontSize="sm"
          >
            $20
          </Text>
          bonus when you receive qualifying direct deposits
        </Text>
      </Box>
    </Flex>
  );
};

const Benefit = memo(BenefitComponent);

export default Benefit;
