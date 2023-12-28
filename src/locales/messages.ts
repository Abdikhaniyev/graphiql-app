import { LOCALES, Locales, setRelation } from './locales';

export enum MESSAGES {
  EMPTY = 0,
  EMAIL,
  EMAIL_REQUIRED,

  PASSWORD,
  PASSWORD_REQUIRED,
  PASSWORD_RULE,
  PASSWORD_RULE2,

  PASSWORD_CONFIRM,
  PASSWORD_CONFIRM_REQUIRED,
  PASSWORD_CONFIRM_RULE,

  AUTH_ERROR,
  DEFAULT = EMPTY,
}
export type Messages<T = string> = Partial<Record<MESSAGES, T>>;
export type Message = [MESSAGES, string, string];

export const getMessage = (key = MESSAGES.EMPTY, locale = LOCALES.DEFAULT) => {
  const messageProp = message[key] ?? '';
  return messageProp[locale] ?? '';
};
const setMessage = setRelation<Messages<Locales>>();

export const message: Messages<Locales> = (
  [
    [MESSAGES.EMPTY, '', ''],
    [MESSAGES.EMAIL, 'Please enter a email', 'Введите адрес электронной почты'],
    [
      MESSAGES.EMAIL_REQUIRED,
      'Please enter a valid email!',
      'Введите корректный адрес электронной почты!',
    ],
    [MESSAGES.PASSWORD, 'Please enter a password', 'Введите пароль'],
    [MESSAGES.PASSWORD_REQUIRED, 'Please enter a valid password!', 'Введите корректный пароль!'],
    [
      MESSAGES.PASSWORD_RULE,
      'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
      'Пароль должен содержать минимум 8 символов, как минимум один верхнем регистре и один в нижнем, и одну цифру',
    ],
    [
      MESSAGES.PASSWORD_RULE2,
      'Passwords should not contain leading or trailing whitespace',
      'Пароли не должны содержать пробел в начеле и конце',
    ],
    [MESSAGES.PASSWORD_CONFIRM, 'Please confirm your password', 'Подтвердите пароль'],
    [
      MESSAGES.PASSWORD_CONFIRM_REQUIRED,
      'Please confirm your password!',
      'Подтвердите ваш пароль!',
    ],
    [MESSAGES.PASSWORD_CONFIRM_RULE, `Passwords don't match`, 'Пароли не совпадают'],
    [MESSAGES.AUTH_ERROR, `Authorization error:`, 'Ошибка авторизации'],
  ] as Message[]
).reduce(setMessage, {} as Messages<Locales>) as Messages<Locales>;
