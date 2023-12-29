import { Spin, message } from 'antd';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { getMessage, MESSAGES } from '../locales/messages';
import { Context } from '../store/context';

export default function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const { locale } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const permissionDenied = () => {
    message.error(getMessage(MESSAGES.PERMISSION_DENIED, locale));
  };

  if (!user && !loading) {
    permissionDenied();
    return <Navigate to={ROUTES.DEFAULT} />;
  }

  return (
    <Spin size="large" tip="Loading" spinning={loading} style={{ minHeight: '90vh' }}>
      <Outlet />
    </Spin>
  );
}
