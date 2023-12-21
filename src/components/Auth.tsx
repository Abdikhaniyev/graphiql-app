import { useContext } from 'react';
import { Button } from 'antd';
import { getText, KEYS as TEXT } from '../locales/text';
import { Context } from '../store/context';

export default function Auth() {
  const { locale } = useContext(Context);
  const authLabel = getText(TEXT.SIGN_IN, locale);
  return (
    <Button
      type="primary"
      shape="round"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {authLabel}
    </Button>
  );
}
