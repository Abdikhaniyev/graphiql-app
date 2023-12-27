import { Rule, RuleRender } from 'antd/es/form';

export type SignInForm = {
  email: string;
  password: string;
};
export type ExtendedRule = RuleRender | (Rule & { messageKey: MESSAGES });
export type GetFieldValue = (value: string) => string;
export type Validator = { getFieldValue: GetFieldValue };
