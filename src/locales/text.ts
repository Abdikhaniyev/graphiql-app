import { KEYS as LOCALES, Keys as Locales } from './locales';

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
export const text: Keys<Locales> = {
  [KEYS.EMPTY]: { [LOCALES.EN]: '', [LOCALES.RU]: '' },

  [KEYS.RUSSIAN]: { [LOCALES.EN]: 'Russian', [LOCALES.RU]: 'Русский' },
  [KEYS.ENGLISH]: { [LOCALES.EN]: 'English', [LOCALES.RU]: 'Английский' },

  [KEYS.SIGN_IN]: { [LOCALES.EN]: 'Sign in', [LOCALES.RU]: 'Войти' },
  [KEYS.SIGN_UP]: { [LOCALES.EN]: 'Sign up', [LOCALES.RU]: 'Регистрация' },
  [KEYS.SIGN_OUT]: { [LOCALES.EN]: 'Sign out', [LOCALES.RU]: 'Выйти' },

  [KEYS.EMAIL]: { [LOCALES.EN]: 'Email', [LOCALES.RU]: 'Почта' },
  [KEYS.PASSWORD]: { [LOCALES.EN]: 'Password', [LOCALES.RU]: 'Пароль' },
  [KEYS.PASSWORD_CONFIRM]: { [LOCALES.EN]: 'Password Confirm', [LOCALES.RU]: 'Подтвердите пароль' },
};
export const getText = (key = KEYS.EMPTY, locale = LOCALES.DEFAULT) => {
  const textProp = text[key] ?? '';
  return textProp[locale] ?? '';
};
