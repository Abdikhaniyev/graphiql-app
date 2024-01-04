import { testNode } from '../tests/testNode';
import { Layout } from 'antd';

const { Sider } = Layout;

export default function LayoutSidebar() {
  return (
    <Sider
      collapsedWidth="64"
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        left: 0,
        top: 0,
        bottom: 0,
        borderRight: '1px solid #0505050f',
      }}
      {...testNode('sidebar')}
    >
      Sidebar
    </Sider>
  );
}
