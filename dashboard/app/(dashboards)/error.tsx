'use client';

import { FallbackErrorBoundary } from '@/ui/components';

const Error = ({ error }: { error: Error }) => (
  <FallbackErrorBoundary error={error} />
);

export default Error;
