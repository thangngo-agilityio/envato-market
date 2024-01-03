const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <p>Header</p>
    <p>Sidebar</p>
    {children}
  </>
);

export default MainLayout;
