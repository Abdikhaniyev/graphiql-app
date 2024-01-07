import { Icon } from '@iconify/react';
import { Avatar, Button, Dropdown, Grid, MenuProps, Modal, Typography } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth as firebaseAuth } from '../firebase/firebase';
import { useAuth } from '../firebase/hooks/useAuth';
import { KEYS as METHODS } from '../firebase/methods/methods';
import { KEYS as TEXT, getText } from '../locales/text';
import { ROUTES } from '../routes/routes';
import { Context } from '../store/context';
import { testNode } from '../tests/testNode';
import AuthForm from './AuthForm/AuthForm';

const { useBreakpoint } = Grid;

export default function Auth() {
  const { md } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<METHODS>(METHODS.NOTHING);
  const [user, , , authMethod] = useAuth(firebaseAuth, method);
  const { locale } = useContext(Context);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const authButtons: { label: string; action: () => void; method: METHODS }[] = [
    {
      label: getText(TEXT.SIGN_IN, locale),
      action: showModal,
      method: METHODS.SIGN_IN,
    },
    {
      label: getText(TEXT.SIGN_UP, locale),
      action: showModal,
      method: METHODS.SIGN_UP,
    },
  ];

  const userMenu: MenuProps['items'] = [
    {
      key: 'auth-button-3',
      label: getText(TEXT.SIGN_OUT, locale),
      icon: <Icon icon="ant-design:logout-outlined" />,
      onClick: () => {
        setMethod(METHODS.SIGN_OUT);
        handleCancel();
      },
    },
  ];

  useEffect(() => {
    if (method === METHODS.SIGN_OUT) {
      authMethod('', '');
      setMethod(METHODS.NOTHING);
      navigate(ROUTES.DEFAULT);
    }
    if (method !== METHODS.NOTHING) navigate(ROUTES.DEFAULT);
  }, [method]);

  return (
    <>
      {!user &&
        authButtons.map(({ label, action, method }, index) => {
          return (
            <Button
              key={`auth-button-${index}`}
              type="primary"
              onClick={() => {
                setMethod(method);
                action();
              }}
              {...testNode(`auth-button-${index}`)}
            >
              {label}
            </Button>
          );
        })}
      {user && (
        <Dropdown menu={{ items: userMenu }} trigger={['click']}>
          <Button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size={'small'}>{user?.email?.[0]?.toUpperCase()}</Avatar>
            <Typography.Paragraph
              ellipsis={true}
              style={{ margin: 0, maxWidth: md ? 'max-content' : '100px' }}
            >
              {user?.email}
            </Typography.Paragraph>
          </Button>
        </Dropdown>
      )}
      <Modal open={open} title={user?.email} onCancel={handleCancel} footer={null}>
        <AuthForm onFinish={() => setOpen(false)} method={method} />
      </Modal>
    </>
  );
}
