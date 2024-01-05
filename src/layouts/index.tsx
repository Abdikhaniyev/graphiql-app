import { Grid, Layout } from 'antd';
import LayoutHeader from './Header';
import { Outlet } from 'react-router-dom';
import LayoutFooter from './Footer';

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
    padding: md ? '0 50px' : '0 16px',
  };

  return (
    <Layout>
      <Layout style={layoutStyle}>
        <LayoutHeader />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
}
