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
  HOME,
  OUR_TEAM,
  ABOUT_PROJECT,
  ABOUT_PROJECT_DESCRIPTION,
  ABOUT_COURSE_DESCRIPTION,
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

  [KEYS.HOME, 'Home', 'Главная'],
  [KEYS.OUR_TEAM, 'Our team', 'Наша команда'],
  [KEYS.ABOUT_PROJECT, 'About project', 'О проекте'],
  [
    KEYS.ABOUT_PROJECT_DESCRIPTION,
    'This application was created as part of training at RS School. GraphiQL is a powerful tool for working with the GraphQL query language. It is an interactive web environment designed to create, debug, and test GraphQL queries. The GraphiQL project makes it easy to interact with an API that uses GraphQL.',
    'Это приложение создано в рамках обучения в RS School. GraphiQL представляет собой мощный инструмент для работы с языком запросов GraphQL. Это интерактивная веб-среда, предназначенная для создания, отладки и тестирования запросов GraphQL. Проект GraphiQL облегчает взаимодействие с API, использующим GraphQL.',
  ],
  [
    KEYS.ABOUT_COURSE_DESCRIPTION,
    'RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer community since 2013.',
    'RS School — это бесплатная образовательная программа, проводимая сообществом разработчиков The Rolling Scopes с 2013 года.',
  ],
];
export const text: Keys<Locales> = textInit.reduce(setText, {} as Keys<Locales>) as Keys<Locales>;
