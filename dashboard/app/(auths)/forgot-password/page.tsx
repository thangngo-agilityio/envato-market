import { memo } from 'react';

// Components
import { ForgotPasswordSection } from '@/ui/sections';

const ForgotPassword = (): JSX.Element => <ForgotPasswordSection />;

const ForgotPasswordPage = memo(ForgotPassword);

export default ForgotPasswordPage;
