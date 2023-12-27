import ru_RU from 'antd/locale/ru_RU';
import en_US from 'antd/locale/en_US';

export enum LOCALES {
  EN = 0,
  RU,
  DEFAULT = EN,
}
export type Locales<T = string> = Partial<Record<LOCALES, T>>;
export const locales = {
  [LOCALES.RU]: ru_RU,
  [LOCALES.EN]: en_US,
};
const config = {
  dev: false,
  locale: true,
};
export const setRelation = <KEY, LINK = string>({ dev, locale } = config) => {
  return (acc: KEY, [key, ...values]: [keyof KEY, ...LINK[]]) => {
    const prop =
      locale &&
      values.reduce((acc, val, index) => {
        if (dev) console.log('#setRelation reducer', index, val);
        Object.assign(acc, {
          [index]: val,
        });
        return acc;
      }, {});
    const languageProp = values[0];
    if (dev) {
      console.log('Object:', acc);
      console.log('Key:', key);
      console.log('Prop:', prop);
      console.log('Language prop:', languageProp);
    }
    const result = Object.assign(Object(acc), {
      [key]: locale ? prop : languageProp,
    }) as KEY;
    return result;
  };
};
