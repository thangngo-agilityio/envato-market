import { ReactNode, memo } from 'react';

// Sections
import { AccountSection } from '@/ui/sections';

type TAuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayoutComponent = ({ children }: TAuthLayoutProps) => (
  <AccountSection>{children}</AccountSection>
);

const AuthLayout = memo(AuthLayoutComponent);

export default AuthLayout;
