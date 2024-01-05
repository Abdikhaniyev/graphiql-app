import { testNode } from '../../tests/testNode';
import { Card, Col, Grid, Row, Typography } from 'antd';
import { useContext } from 'react';
import { KEYS as TEXT, getText } from '../../locales/text';
import { Context } from '../../store/context';
import TeamCard from './components/TeamCard';
import { User } from './components/TeamCard.d';

export default function Welcome() {
  const { md } = Grid.useBreakpoint();
  const { locale } = useContext(Context);

  const teamMembers: User[] = [
    {
      username: 'Abdikhaniyev',
      fullName: 'Alisher Abdikhaniyev',
      location: 'Kazakhstan, Almaty',
      avatar:
        'https://avatars.githubusercontent.com/u/44086497?s=400&u=0deee2052e0aa1f72f4ca5b8880dcef90d162087&v=4',
      position: 'Frontend Developer',
      socialNetworks: [
        {
          icon: 'skill-icons:linkedin',
          link: 'https://www.linkedin.com/in/alisher-abdikhaniyev/',
          name: 'LinkedIn',
        },
        {
          icon: 'skill-icons:github-light',
          link: 'https://github.com/Abdikhaniyev',
          name: 'GitHub',
        },
        {
          icon: 'skill-icons:discord',
          link: 'https://discord.com/users/1081965684755546224',
          name: 'Discord',
        },
      ],
    },
    {
      username: 'ValeryMatskevich',
      fullName: 'Valery Matskevich',
      location: 'Belarus, Minsk',
      avatar: 'https://avatars.githubusercontent.com/u/112801688?v=4',
      position: 'QA Engineer',
      socialNetworks: [
        {
          icon: 'skill-icons:linkedin',
          link: 'https://www.linkedin.com/in/vmatskevich/',
          name: 'LinkedIn',
        },
        {
          icon: 'skill-icons:github-light',
          link: 'https://github.com/valerymatskevich',
          name: 'GitHub',
        },
        {
          icon: 'skill-icons:discord',
          link: 'https://discordapp.com/users/1015911210165751890',
          name: 'Discord',
        },
      ],
    },
    {
      username: 'Vladimirtrainee',
      fullName: 'Vladimir Kirpichyov',
      location: 'Belarus, Vitebsk',
      avatar: 'https://avatars.githubusercontent.com/u/124265504?v=4',
      position: 'Software Engineer',
      socialNetworks: [
        {
          icon: 'skill-icons:linkedin',
          link: 'https://www.linkedin.com/in/vladimir-kirpichyov-aa188a258/',
          name: 'LinkedIn',
        },
        {
          icon: 'skill-icons:github-light',
          link: 'https://github.com/vladimirtrainee',
          name: 'GitHub',
        },
        {
          icon: 'skill-icons:discord',
          link: 'https://discordapp.com/users/1070678019552854086',
          name: 'Discord',
        },
      ],
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ display: 'flex' }} {...testNode('welcome')}>
      <Col xs={24} sm={24} md={12} order={md ? 1 : 2}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Typography.Title level={4}>{getText(TEXT.OUR_TEAM, locale)}</Typography.Title>
          </Col>

          {teamMembers.map((user) => (
            <Col xs={24} key={user.username}>
              <TeamCard user={user} />
            </Col>
          ))}
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} order={md ? 2 : 1}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Card
              title={getText(TEXT.ABOUT_PROJECT, locale)}
              cover={<img src="/developing.svg" alt="Project" height={200} />}
            >
              <Typography.Paragraph>
                {getText(TEXT.ABOUT_PROJECT_DESCRIPTION, locale)}
              </Typography.Paragraph>
            </Card>
          </Col>
          <Col xs={24}>
            <Card
              title={'The Rolling Scopes'}
              cover={<img src="/course.svg" alt="Project" height={200} />}
            >
              <Typography.Paragraph>
                {getText(TEXT.ABOUT_COURSE_DESCRIPTION, locale)}
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
