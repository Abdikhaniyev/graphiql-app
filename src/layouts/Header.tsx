import { useEffect, useState, useContext } from 'react';
import { Layout, Row, Col, Menu, MenuProps } from 'antd';
import { HomeFilled, PlayCircleFilled } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../components';
import { Auth } from '../components';
import { useAuth } from './../firebase/hooks/useAuth';
import { auth as firebaseAuth } from '../firebase/firebase';
import { ROUTES } from '../routes';
import { Context } from '../store/context';
import { getText, KEYS as TEXT } from '../locales/text';

const { Header } = Layout;

export default function LayoutHeader() {
  const [user, loading] = useAuth(firebaseAuth);
  const isLogged = user?.email ? true : false;
  const [background, setBackground] = useState('transparent');
  const [menuOption, setMenuOption] = useState<ROUTES>(ROUTES.DEFAULT);
  const [items, setItems] = useState<MenuProps['items']>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { locale } = useContext(Context);

  useEffect(() => {
    const home = getText(TEXT.HOME, locale);
    const playground = getText(TEXT.PLAYGROUND, locale);
    setItems([
      {
        label: <Link to={ROUTES.HOME}>{home}</Link>,
        key: ROUTES.HOME,
        icon: <HomeFilled />,
      },
      {
        label: <Link to={isLogged ? ROUTES.PLAYGROUND : menuOption}>{playground}</Link>,
        key: ROUTES.PLAYGROUND,
        icon: <PlayCircleFilled />,
        disabled: !isLogged,
      },
    ]);
  }, [locale, isLogged]);

  const handleScroll = () => {
    window.scrollY > 0 ? setBackground('#ffffffbb') : setBackground('transparent');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMenuOption(pathname as ROUTES);
  }, [pathname]);
  useEffect(() => {
    if (!loading && !isLogged) navigate(ROUTES.DEFAULT);
  }, [loading, isLogged]);

  const onClick: MenuProps['onClick'] = (e) => {
    setMenuOption(e.key as ROUTES);
  };

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
        alignItems: 'end',
        zIndex: 1000,
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[menuOption]}
        mode="horizontal"
        items={items}
        style={{ width: '50%', display: 'flex' }}
      />
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
