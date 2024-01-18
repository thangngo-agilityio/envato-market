import dynamic from 'next/dynamic';

// Components
const MainLayout = dynamic(() => import('@/ui/layouts/MainLayout'));

const Layout = ({ children }: { children: React.ReactNode }) => (
  <MainLayout>{children}</MainLayout>
);

export default Layout;
