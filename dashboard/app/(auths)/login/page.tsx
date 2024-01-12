import dynamic from 'next/dynamic';
import { memo } from 'react';

const AuthForm = dynamic(() => import('@/ui/components/AuthForm'));

const Login = (): JSX.Element => <AuthForm />;

const LoginPage = memo(Login);

export default LoginPage;
