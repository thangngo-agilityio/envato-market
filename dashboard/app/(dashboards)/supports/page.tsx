import { memo } from 'react';
import { QueryProvider } from '@/ui/providers';

// Sections
import { SupportsSection } from '@/ui/sections';

const SupportsPage = () => (
  <QueryProvider>
    <SupportsSection />
  </QueryProvider>
);

const SupportsPageMemorize = memo(SupportsPage);

export default SupportsPageMemorize;
