import { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { KEYS as TEXT, getText } from '../locales/text';
import { useContext } from 'react';
import { Context } from '../store/context';
import { useAuth } from '../firebase/hooks/useAuth';
import { auth as firebaseAuth } from '../firebase/firebase';
import { KEYS as METHODS } from '../firebase/methods/methods';
import { ROUTES } from '../routes/routes';

export default function Page404() {
  const navigate = useNavigate();
  const { locale } = useContext(Context);
  const [method, setMethod] = useState<METHODS>(METHODS.NOTHING);
  const [user, , , authMethod] = useAuth(firebaseAuth, method);

  useEffect(() => {
    if (method === METHODS.SIGN_OUT) {
      authMethod('', '');
      setMethod(METHODS.NOTHING);
      navigate(ROUTES.DEFAULT);
    } else {
      if (user?.email) navigate(ROUTES.HOME);
    }
  }, [user, method]);

  const handleBackHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <Result
      status={'404'}
      title="404"
      subTitle={getText(TEXT.NOT_FOUND, locale)}
      extra={
        <Button type="primary" onClick={handleBackHome}>
          {getText(TEXT.BACK_HOME, locale)}
        </Button>
      }
    />
  );
}
