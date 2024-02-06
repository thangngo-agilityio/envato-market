import { Center, Spinner } from '@chakra-ui/react';
import { ReactNode } from 'react';

type TIndicatorProps = {
  isOpen?: boolean;
  children?: ReactNode;
};

const Indicator = ({
  isOpen = false,
  children,
}: TIndicatorProps): JSX.Element => (
  <>
    {children}
    {isOpen && (
      <Center
        position="fixed"
        zIndex={999999999}
        inset={0}
        bg="black"
        opacity={0.7}
      >
        <Spinner
          size={{
            base: 'md',
            md: 'lg',
            lg: 'xl',
          }}
          color="blue.500"
        />
      </Center>
    )}
  </>
);

export default Indicator;
