import { Flex, Grid, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { Auth, LanguageSwitcher } from '../components';
import Menu from './Menu';

const { Header } = Layout;
const { useBreakpoint } = Grid;

export default function LayoutHeader() {
  const { md } = useBreakpoint();
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
        alignItems: 'flex-end',
        padding: md ? '16px 32px' : '0 16px',
        zIndex: 1000,
        height: 'auto',
      }}
    >
      <Menu />
      <Flex gap={8} wrap="wrap">
        <LanguageSwitcher />
        <Auth />
      </Flex>
    </Header>
  );
}
