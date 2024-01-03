import { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { getText, KEYS as TEXT } from '../locales/text';
import { Context } from '../store/context';
import AuthForm from './AuthForm/AuthForm';
import { auth as firebaseAuth } from '../firebase/firebase';
import { useAuth } from '../firebase/hooks/useAuth';
import { ButtonType } from 'antd/lib/button/buttonHelpers';
import { KEYS as METHODS } from '../firebase/methods/methods';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

export default function Auth() {
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
  const authLabels: [string, boolean, ButtonType, () => void, METHODS][] = [
    [user?.email ?? '', !!user, 'text', () => {}, METHODS.NOTHING],
    [getText(TEXT.SIGN_IN, locale), !user, 'primary', showModal, METHODS.SIGN_IN],
    [getText(TEXT.SIGN_UP, locale), !user, 'primary', showModal, METHODS.SIGN_UP],
    [getText(TEXT.SIGN_OUT, locale), !!user, 'primary', handleCancel, METHODS.SIGN_OUT],
  ];
  useEffect(() => {
    if (method === METHODS.SIGN_OUT) {
      authMethod('', '');
      setMethod(METHODS.NOTHING);
      navigate(ROUTES.DEFAULT);
    }
  }, [method]);

  return (
    <>
      <Row gutter={[8, 8]}>
        {authLabels.map(([text, condition, type, action, actionMethod], index) => {
          if (!condition) return <Fragment key={`fragment-${index}`}></Fragment>;
          return (
            <Col key={`auth-col-${index}`}>
              <Button
                key={`auth-button-${index}`}
                type={type}
                shape="round"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  setMethod(actionMethod);
                  action();
                }}
              >
                {text}
              </Button>
            </Col>
          );
        })}
      </Row>
      <Modal open={open} title={user?.email} onCancel={handleCancel} footer={null}>
        <AuthForm onFinish={() => setOpen(false)} method={method} />
      </Modal>
    </>
  );
}
