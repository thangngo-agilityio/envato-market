'use client';

import { FallbackErrorBoundary } from '@app/components';

const Error = ({ error }: { error: Error }) => (
  <FallbackErrorBoundary error={error} />
);

export default Error;
