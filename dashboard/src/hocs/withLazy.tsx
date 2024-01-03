import { Spinner } from '@chakra-ui/react';
import { FunctionComponent, Suspense } from 'react';

const withLazy = <TProps extends object>(
  Component: FunctionComponent<TProps>,
): FunctionComponent<TProps> => {
  const ComponentLazy = (props: TProps): JSX.Element => (
    <Suspense fallback={<Spinner position="fixed" top="50%" left="50%" />}>
      <Component {...props} />
    </Suspense>
  );

  return ComponentLazy;
};

export default withLazy;
