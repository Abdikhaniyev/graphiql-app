import { Icon } from '@iconify/react';
import { Button, Drawer, Layout, Spin } from 'antd';
import { Suspense, lazy, useState } from 'react';
import { testNode } from '../tests/testNode';

const { Sider } = Layout;

const Documentation = lazy(() => import('../pages/GraphiQL/components/Documentation'));

export default function LayoutSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sider
      collapsedWidth="64"
      collapsed={true}
      theme="light"
      style={{
        padding: '16px',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
      {...testNode('sidebar')}
    >
      <Button
        onClick={() => setOpen(!open)}
        icon={<Icon icon="fluent:document-folder-16-regular" />}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...testNode('button-sidebar-open')}
      />
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setOpen(!open)}
        open={open}
        width={280}
      >
        <Suspense fallback={<Spin />}>
          <Documentation />
        </Suspense>
      </Drawer>
    </Sider>
  );
}
