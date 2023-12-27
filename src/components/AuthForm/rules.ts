import type { ExtendedRule, Validator } from './AuthForm.d';
import { getMessage, MESSAGES } from '../../locales/messages';
import { LOCALES, setRelation } from '../../locales/locales';

export enum RULES {
  EMPTY = 0,
  EMAIL,
  PASSWORD,
  PASSWORD_CONFIRM,
  DEFAULT = EMPTY,
}

//8 symbols min, 1 uppercase, 1 lowercase, 1 number
export const VALID_PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const EMAIL_RULES: ExtendedRule[] = [
  {
    type: 'email',
    messageKey: MESSAGES.EMAIL,
  },
  {
    required: true,
    messageKey: MESSAGES.EMAIL_REQUIRED,
  },
];
export const PASSWORD_RULES: ExtendedRule[] = [
  {
    required: true,
    messageKey: MESSAGES.PASSWORD_REQUIRED,
  },
  {
    pattern: VALID_PASSWORD_REGEXP,
    messageKey: MESSAGES.PASSWORD_RULE,
  },
  () => ({
    validator(_, value: string) {
      const isOk = !(value !== value.trim());
      return isOk
        ? Promise.resolve()
        : Promise.reject(new Error(getMessage(MESSAGES.PASSWORD_RULE2)));
    },
  }),
];

export const CONFIRM_PASSWORD_RULES: ExtendedRule[] = [
  {
    required: true,
    messageKey: MESSAGES.PASSWORD_CONFIRM_REQUIRED,
  },
  ({ getFieldValue }: Validator) => ({
    validator(_, value: string) {
      const isOk = !value || getFieldValue('password') === value;
      return isOk
        ? Promise.resolve()
        : Promise.reject(new Error(getMessage(MESSAGES.PASSWORD_CONFIRM_RULE)));
    },
  }),
];

export type Rules<T = string> = Partial<Record<RULES, T>>;

const setRule = setRelation<Rules<ExtendedRule[]>, ExtendedRule[]>({ locale: false, dev: false });
export const initRules: [RULES, ExtendedRule[]][] = [
  [RULES.EMAIL, EMAIL_RULES],
  [RULES.PASSWORD, PASSWORD_RULES],
  [RULES.PASSWORD_CONFIRM, CONFIRM_PASSWORD_RULES],
];
export const rules: Rules<ExtendedRule[]> = initRules.reduce(
  setRule,
  {} as Rules<ExtendedRule[]>
) as Rules<ExtendedRule[]>;

export const ruleLocale = (
  extendedRules: ExtendedRule[],
  ruleKey: RULES,
  locale: LOCALES
): void => {
  Object.values(extendedRules[ruleKey]).forEach((value) => {
    const { messageKey } = value;
    value.message = getMessage(messageKey, locale);
  });
};

export const updateRuleLocale = (definedRules: RULES[], locale: LOCALES) => {
  definedRules.forEach((ruleKey) => {
    ruleLocale(rules as ExtendedRule[], ruleKey, locale);
  });
};
