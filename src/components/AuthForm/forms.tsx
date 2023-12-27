import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import type { ExtendedRule } from './AuthForm.d';
import { Fragment } from 'react';

export enum FORMS {
  EMPTY = 0,
  EMAIL,
  PASSWORD,
  PASSWORD_CONFIRM,
  SUBMIT,
  DEFAULT = EMPTY,
}
type ItemForm = {
  labelSubmit?: string;
  rules?: ExtendedRule[];
  placeholder?: string;
};

export const emptyForm = () => <Fragment></Fragment>;
export const emailForm = ({ rules, placeholder }: ItemForm) => {
  if (!rules || !placeholder) return emptyForm();
  return (
    <Form.Item name="email" rules={rules}>
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        autoComplete="email"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
export const passwordForm = ({ rules, placeholder }: ItemForm) => {
  if (!rules || !placeholder) return emptyForm();
  return (
    <Form.Item name="password" hasFeedback validateFirst rules={rules}>
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        autoComplete="current-password"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
export const passwordConfirmForm = ({ rules, placeholder }: ItemForm) => {
  if (!rules || !placeholder) return emptyForm();
  return (
    <Form.Item name="password-confirm" hasFeedback validateFirst rules={rules}>
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        autoComplete="new-password"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
export const submitButtonForm = ({ labelSubmit }: ItemForm) => {
  if (!labelSubmit) return emptyForm();
  return (
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
  );
};
