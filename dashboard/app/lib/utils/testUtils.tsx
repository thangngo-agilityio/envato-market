import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const renderQueryProviderTest = (component: JSX.Element) => {
  const { render } = testLibReactUtils;
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};
