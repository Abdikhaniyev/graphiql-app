import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import { HomeFilled, PlayCircleFilled } from '@ant-design/icons';
import { ROUTES, privateRoutes } from '../routes/routes';
import { Context } from '../store/context';
import { useAuth } from './../firebase/hooks/useAuth';
import { auth as firebaseAuth } from '../firebase/firebase';
import { getText, KEYS as TEXT } from '../locales/text';

const { Text } = Typography;
enum ICONS {
  HOME,
  PLAYGROUND,
}
const icons = {
  [ICONS.HOME]: HomeFilled,
  [ICONS.PLAYGROUND]: PlayCircleFilled,
};
type Menu = [ROUTES, TEXT, ICONS];
const menu: Menu[] = [
  [ROUTES.HOME, TEXT.HOME, ICONS.HOME],
  [ROUTES.PLAYGROUND, TEXT.PLAYGROUND, ICONS.PLAYGROUND],
];

export default function Menu() {
  const { locale } = useContext(Context);
  const { pathname } = useLocation();
  const [user] = useAuth(firebaseAuth);
  const isLogged = user?.email ? true : false;

  return (
    <Row
      gutter={[8, 8]}
      style={{
        lineHeight: '32px',
        paddingTop: '8px',
      }}
    >
      {menu.map(([menuKey, textKey, iconKey]: Menu) => {
        console.log(iconKey);
        const text = getText(textKey, locale);
        const isPrivate = privateRoutes.indexOf(menuKey as ROUTES) >= 0;
        const borderBottom = pathname === menuKey ? 'solid' : 'none';
        const Icon = icons[iconKey];
        const MenuItem =
          isPrivate && !isLogged ? (
            <Text disabled>{text} </Text>
          ) : (
            <Link to={menuKey} style={{ borderBottom, padding: '0px' }}>
              <Icon style={{ padding: '8px' }} />
              {text}
            </Link>
          );
        return <Col key={`col-${menuKey}`}>{MenuItem}</Col>;
      })}
    </Row>
  );
}
