import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { KEYS as TEXT, getText } from '../locales/text';
import { useContext } from 'react';
import { Context } from '../store/context';

export default function Page404() {
  const navigate = useNavigate();
  const { locale } = useContext(Context);

  const handleBackHome = () => {
    navigate('/');
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
