import { Layout } from 'antd';
import LayoutHeader from './Header';
import { Outlet } from 'react-router-dom';
import LayoutFooter from './Footer';

const { Content } = Layout;

export default function AppLayout() {
  const layoutStyle = {
    minHeight: '100vh',
  };

  const contentStyle = {
    width: '100%',
    margin: '16px 0',
    padding: '0 50px',
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
