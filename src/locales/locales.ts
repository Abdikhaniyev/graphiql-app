import ru_RU from 'antd/locale/ru_RU';
import en_US from 'antd/locale/en_US';

export enum KEYS {
  RU = 0,
  EN,
  DEFAULT = EN,
}
export type Keys<T = string> = Partial<Record<KEYS, T>>;
export const locales = {
  [KEYS.RU]: ru_RU,
  [KEYS.EN]: en_US,
};
