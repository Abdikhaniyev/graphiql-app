import { useContext, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import { ROUTES, privateRoutes } from '../routes/routes';
import { Context } from '../store/context';
import { useAuth } from './../firebase/hooks/useAuth';
import { auth as firebaseAuth } from '../firebase/firebase';
import { getText, KEYS as TEXT } from '../locales/text';

const { Text } = Typography;

type Menu = [ROUTES, TEXT];
const menu: Menu[] = [
  [ROUTES.HOME, TEXT.HOME],
  [ROUTES.PLAYGROUND, TEXT.PLAYGROUND],
];

export default function Menu() {
  const { locale } = useContext(Context);
  const { pathname } = useLocation();
  const [user] = useAuth(firebaseAuth);
  const isLogged = user?.email ? true : false;

  return (
    <Row gutter={[8, 8]}>
      {menu.map(([menuKey, textKey]: Menu) => {
        const text = getText(textKey, locale);
        const isPrivate = privateRoutes.indexOf(menuKey as ROUTES) >= 0;
        const borderBottom = pathname === menuKey ? 'solid' : 'none';
        const MenuItem =
          isPrivate && !isLogged ? (
            <Text disabled>{text}</Text>
          ) : (
            <Link to={menuKey} style={{ borderBottom }}>
              {text}
            </Link>
          );
        return (
          <Fragment key={`key-${menuKey}`}>
            <Col key={`col-${menuKey}`}>{MenuItem}</Col>
          </Fragment>
        );
      })}
    </Row>
  );
}
