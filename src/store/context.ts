import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { KEYS as LOCALES } from '../locales/locales';

export type ContextType = {
  locale: LOCALES;
  setLocale?: Dispatch<SetStateAction<LOCALES>>;
};
export const defaultContext = {
  locale: LOCALES.DEFAULT,
};
export const Context = createContext<ContextType>(defaultContext);
