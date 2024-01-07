import { Grid, Layout } from 'antd';
import { Outlet, matchPath, useLocation } from 'react-router-dom';
import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import LayoutSidebar from './Sidebar';
import { ROUTES } from '../routes/routes';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function AppLayout() {
  const { md } = useBreakpoint();
  const { pathname } = useLocation();

  const layoutStyle = {
    minHeight: '100vh',
  };

  const contentStyle = {
    width: '100%',
    margin: '16px 0',
    padding: md ? '0 32px 0 16px' : '0 16px',
  };

  return (
    <Layout style={layoutStyle}>
      <LayoutHeader />
      <Layout>
        {matchPath(pathname, ROUTES.PLAYGROUND) && <LayoutSidebar />}
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      <LayoutFooter />
    </Layout>
  );
}
