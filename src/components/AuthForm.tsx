import { useContext } from 'react';
import { Context } from '../store/context';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { auth as firebaseAuth } from '../firebase/firebase';
import { useAuth } from '../firebase/hooks/useAuth';
import { SignInForm } from './AuthForm.d';
import { KEYS as METHODS } from '../firebase/methods/methods';
import { getText, KEYS as TEXT } from '../locales/text';

const LoginForm = ({ onFinish, method }: { onFinish: () => void; method: METHODS }) => {
  const [loginForm] = Form.useForm();
  const { locale } = useContext(Context);
  const [user, , , authMethod] = useAuth(firebaseAuth, method);
  const login = async () => {
    const { email, password }: SignInForm = loginForm.getFieldsValue();
    try {
      authMethod(email, password);
      onFinish();
    } catch (e) {
      console.log('Credential error', e);
    }
  };
  const labelSubmit = getText(method === METHODS.SIGN_UP ? TEXT.SIGN_UP : TEXT.SIGN_IN, locale);
  return (
    <>
      {!user && <br />}
      <Form form={loginForm} name="normal_login" className="login-form" onFinish={login}>
        <Form.Item name="email">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={getText(TEXT.EMAIL, locale)}
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item name="password" hasFeedback validateFirst>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            autoComplete="current-password"
            placeholder={getText(TEXT.PASSWORD, locale)}
          />
        </Form.Item>
        {method === METHODS.SIGN_UP && (
          <Form.Item name="password-confirm" hasFeedback validateFirst>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              autoComplete="new-password"
              placeholder={getText(TEXT.PASSWORD_CONFIRM, locale)}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {labelSubmit}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
