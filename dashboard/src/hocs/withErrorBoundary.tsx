import {
  FunctionComponent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
} from 'react';
import { withErrorBoundary as withError } from 'react-error-boundary';

// Components
import { FallbackErrorBoundary } from '@app/components';

export const withErrorBoundary = <TProps extends object>(
  Component: FunctionComponent<TProps>,
): ForwardRefExoticComponent<PropsWithoutRef<TProps>> =>
  withError(Component, {
    FallbackComponent: FallbackErrorBoundary,
  });
