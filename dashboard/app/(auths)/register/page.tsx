import { memo } from 'react';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('@/ui/components/AuthForm'), {
  ssr: false,
});

const RegisterPage = () => <AuthForm isRegister />;

const Register = memo(RegisterPage);

export default Register;
