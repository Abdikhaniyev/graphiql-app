import { Layout, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../components';
import { Auth } from '../components';

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
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Link to="/">Welcome page</Link>
      <Row gutter={[8, 8]}>
        <Col>
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
