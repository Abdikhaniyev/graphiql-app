import { KEYS as LOCALES, Keys as Locales } from './locales';

export enum KEYS {
  EMPTY = 0,
  RUSSIAN,
  ENGLISH,
  SIGN_IN,
  DEFAULT = EMPTY,
}
export type Keys<T = string> = Partial<Record<KEYS, T>>;
export const text: Keys<Locales> = {
  [KEYS.EMPTY]: { [LOCALES.EN]: '', [LOCALES.RU]: '' },

  [KEYS.RUSSIAN]: { [LOCALES.EN]: 'Russian', [LOCALES.RU]: 'Русский' },
  [KEYS.ENGLISH]: { [LOCALES.EN]: 'English', [LOCALES.RU]: 'Английский' },

  [KEYS.SIGN_IN]: { [LOCALES.EN]: 'Sign in', [LOCALES.RU]: 'Войти' },
};
export const getText = (key = KEYS.EMPTY, locale = LOCALES.DEFAULT) => {
  const textProp = text[key] ?? '';
  return textProp[locale] ?? '';
};
