import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../components';

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
      }}
    >
      <Link to="/">Welcome page</Link>

      <LanguageSwitcher />
      {/* user menu */}
    </Header>
  );
}
