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
  HOME,
  OUR_TEAM,
  ABOUT_PROJECT,
  ABOUT_PROJECT_DESCRIPTION,
  ABOUT_COURSE_DESCRIPTION,
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

  [KEYS.HOME]: { [LOCALES.EN]: 'Home', [LOCALES.RU]: 'Главная' },
  [KEYS.OUR_TEAM]: { [LOCALES.EN]: 'Our team', [LOCALES.RU]: 'Наша команда' },
  [KEYS.ABOUT_PROJECT]: { [LOCALES.EN]: 'About project', [LOCALES.RU]: 'О проекте' },
  [KEYS.ABOUT_PROJECT_DESCRIPTION]: {
    [LOCALES.EN]:
      'This application was created as part of training at RS School. GraphiQL is a powerful tool for working with the GraphQL query language. It is an interactive web environment designed to create, debug, and test GraphQL queries. The GraphiQL project makes it easy to interact with an API that uses GraphQL.',
    [LOCALES.RU]:
      'Это приложение создано в рамках обучения в RS School. GraphiQL представляет собой мощный инструмент для работы с языком запросов GraphQL. Это интерактивная веб-среда, предназначенная для создания, отладки и тестирования запросов GraphQL. Проект GraphiQL облегчает взаимодействие с API, использующим GraphQL.',
  },
  [KEYS.ABOUT_COURSE_DESCRIPTION]: {
    [LOCALES.EN]:
      'RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer community since 2013.',
    [LOCALES.RU]:
      'RS School — это бесплатная образовательная программа, проводимая сообществом разработчиков The Rolling Scopes с 2013 года.',
  },
};
export const getText = (key = KEYS.EMPTY, locale = LOCALES.DEFAULT) => {
  const textProp = text[key] ?? '';
  return textProp[locale] ?? '';
};
