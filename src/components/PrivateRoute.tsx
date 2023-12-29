import { Spin, message } from 'antd';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

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
    message.error('Permission denied, please sign in or sign up');
  };

  if (!user && !loading) {
    permissionDenied();
    return <Navigate to={'/'} />;
  }

  return (
    <Spin size="large" tip="Loading" spinning={loading} style={{ minHeight: '90vh' }}>
      <Outlet />
    </Spin>
  );
}
