import { LOCALES, Locales, setRelation } from './locales';

export enum KEYS {
  EMPTY = 0,
  RUSSIAN,
  ENGLISH,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  EMAIL,
  PASSWORD,
  PASSWORD_CONFIRM,
  DEFAULT = EMPTY,
}
export type Keys<T = string> = Partial<Record<KEYS, T>>;
export type Text = [KEYS, string, string];

export const getText = (key = KEYS.EMPTY, locale = LOCALES.DEFAULT) => {
  const textProp = text[key] ?? '';
  return textProp[locale] ?? '';
};

const setText = setRelation<Keys<Locales>>();
export const textInit: Text[] = [
  [KEYS.EMPTY, '', ''],

  [KEYS.RUSSIAN, 'Russian', 'Русский'],
  [KEYS.ENGLISH, 'English', 'Английский'],
  [KEYS.SIGN_IN, 'Sign in', 'Войти'],
  [KEYS.SIGN_UP, 'Sign up', 'Регистрация'],
  [KEYS.SIGN_OUT, 'Sign out', 'Выйти'],

  [KEYS.EMAIL, 'Email', 'Электронная Почта'],

  [KEYS.PASSWORD, 'Password', 'Пароль'],
  [KEYS.PASSWORD_CONFIRM, 'Password Confirm', 'Подтвердите пароль'],
];
export const text: Keys<Locales> = textInit.reduce(setText, {} as Keys<Locales>) as Keys<Locales>;
