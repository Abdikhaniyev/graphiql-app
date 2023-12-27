import { useContext } from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { Icon } from '@iconify/react';
import { Context } from '../store/context';
import { getText, KEYS as TEXT } from '../locales/text';
import { LOCALES } from '../locales/locales';

import type { TextIcon } from './LanguageSwitcher.d';
enum MENU_LIST {
  LOCALES,
  TEXT,
  ICON,
}
const menuText: TextIcon[] = [
  [LOCALES.EN, TEXT.ENGLISH, 'flag-for-united-states'],
  [LOCALES.RU, TEXT.RUSSIAN, 'flag-for-russia'],
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useContext(Context);
  const onClick: MenuProps['onClick'] = (props) => {
    const key: LOCALES = Object(props).key as LOCALES;
    if (setLocale) setLocale(key);
  };
  const items: MenuProps['items'] = menuText.map(([localeKey, textKey, icon]: TextIcon) => {
    return {
      label: getText(textKey, locale),
      key: `${localeKey ?? ''}`,
      icon: <Icon icon={`emojione:${icon}`} />,
    };
  });

  return (
    <Dropdown menu={{ items: items, onClick }} trigger={['click']}>
      <Button
        type="primary"
        shape="round"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon icon="material-symbols:translate" width={16} height={16} />
        {getText(menuText[locale][MENU_LIST.TEXT], locale)}
      </Button>
    </Dropdown>
  );
}
