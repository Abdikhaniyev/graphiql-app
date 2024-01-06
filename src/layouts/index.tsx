import { Grid, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import LayoutSidebar from './Sidebar';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export default function AppLayout() {
  const { md } = useBreakpoint();

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
        <LayoutSidebar />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      <LayoutFooter />
    </Layout>
  );
}
