import { Button, Dropdown, MenuProps } from 'antd';
import { Icon } from '@iconify/react';

export default function LanguageSwitcher() {
  const items: MenuProps['items'] = [
    {
      label: 'English',
      key: 'en',
      icon: <Icon icon="emojione:flag-for-united-states" />,
    },
    {
      label: 'Русский',
      key: 'ru',
      icon: <Icon icon="emojione:flag-for-russia" />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button
        type="primary"
        shape="circle"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon icon="material-symbols:translate" width={16} height={16} />
      </Button>
    </Dropdown>
  );
}
