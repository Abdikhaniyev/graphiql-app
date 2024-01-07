import { Flex, Layout, Space, Typography } from 'antd';
import { useContext } from 'react';
import { Context } from '../store/context';
import { KEYS as TEXT, getText } from '../locales/text';

const { Footer } = Layout;

export default function LayoutFooter() {
  const { locale } = useContext(Context);

  const users = [
    {
      name: 'Alisher Abdikhaniyev',
      link: 'https://github.com/Abdikhaniyev',
    },
    {
      name: 'Valery Matskevich',
      link: 'https://github.com/ValeryMatskevich',
    },
    {
      name: 'Vladimir Kirpichyov',
      link: 'https://github.com/VladimirTrainee',
    },
  ];

  return (
    <Footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Space direction="vertical">
        <Typography>{getText(TEXT.CREATED_BY, locale)}: </Typography>
        <Flex gap={8} wrap="wrap">
          {users.map((user) => (
            <a key={user.name} href={user.link} target="_blank" rel="noreferrer">
              {user.name}
            </a>
          ))}
        </Flex>
      </Space>

      <Typography>&copy; 2023</Typography>

      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img src="/rs_school_js.svg" alt="RS School logo" height={32} />
      </a>
    </Footer>
  );
}
