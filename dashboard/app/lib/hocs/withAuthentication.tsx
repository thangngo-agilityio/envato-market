import { FunctionComponent, MemoExoticComponent, memo } from 'react';

// Layouts
import AuthLayout from '@/(auths)/layout';

export const withAuthenticationLayout = <TProps extends object>(
  Component: FunctionComponent<TProps>,
  isSignInForm = true,
  isForgotPassword = false,
): MemoExoticComponent<FunctionComponent<TProps>> => {
  const AuthLayoutWrapper = (props: TProps): JSX.Element => (
    <AuthLayout
      isSignInForm={isSignInForm}
      isForgotPasswordPage={isForgotPassword}
    >
      <Component {...props} />
    </AuthLayout>
  );

  return memo(AuthLayoutWrapper);
};
