import { useContext, useEffect } from 'react';
import { Context } from '../../store/context';
import { Form } from 'antd';
import { auth as firebaseAuth } from '../../firebase/firebase';
import { useAuth } from '../../firebase/hooks/useAuth';
import { SignInForm } from './AuthForm.d';
import { KEYS as METHODS } from '../../firebase/methods/methods';
import { getText, KEYS as TEXT } from '../../locales/text';
import { rules, RULES, updateRuleLocale } from './rules';
import { emailForm, passwordForm, passwordConfirmForm, submitButtonForm } from './forms';

const definedRules = [RULES.EMAIL, RULES.PASSWORD, RULES.PASSWORD_CONFIRM];
const LoginForm = ({ onFinish, method }: { onFinish: () => void; method: METHODS }) => {
  const [loginForm] = Form.useForm();
  const { locale } = useContext(Context);
  const [user, , , authMethod] = useAuth(firebaseAuth, method);
  useEffect(() => {
    updateRuleLocale(definedRules, locale);
  }, [locale]);
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
        {emailForm({ rules: rules[RULES.EMAIL], placeholder: getText(TEXT.EMAIL, locale) })}
        {passwordForm({
          rules: rules[RULES.PASSWORD],
          placeholder: getText(TEXT.PASSWORD, locale),
        })}
        {method === METHODS.SIGN_UP &&
          rules[RULES.PASSWORD_CONFIRM] &&
          passwordConfirmForm({
            rules: rules[RULES.PASSWORD_CONFIRM],
            placeholder: getText(TEXT.PASSWORD_CONFIRM, locale),
          })}
        {submitButtonForm({ labelSubmit })}
      </Form>
    </>
  );
};

export default LoginForm;
