import { testNode } from '../tests/testNode';
import { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import { LanguageSwitcher } from '../components';
import { Auth } from '../components';
import Menu from './Menu';

const { Header } = Layout;

export default function LayoutHeader() {
  const [background, setBackground] = useState('transparent');

  const handleScroll = () => {
    window.scrollY > 0 ? setBackground('#ffffffbb') : setBackground('transparent');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        backdropFilter: 'blur(4px)',
        background: background,
        transition: 'background 200ms ease-in',
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row wrap',
        rowGap: '4px',
        alignItems: 'start',
        padding: '16px 32px 16px 32px',
        zIndex: 1000,
        height: 'auto',
      }}
    >
      <Menu />
      <Row gutter={[8, 8]}>
        <Col {...testNode('language-header')}>
          <LanguageSwitcher />
        </Col>
        <Col>
          <Auth />
        </Col>
      </Row>
      {/* user menu */}
    </Header>
  );
}
