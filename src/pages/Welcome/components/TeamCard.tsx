import { Avatar, Card, Col, Flex, Row, Typography } from 'antd';
import { User } from './TeamCard.d';
import { Icon } from '@iconify/react';

interface TeamCardProps {
  user: User;
}

export default function TeamCard({ user }: TeamCardProps) {
  const { fullName, avatar, position, socialNetworks, location } = user;
  return (
    <Card size="small">
      <Flex gap={16} wrap="wrap">
        <Avatar
          shape="square"
          src={avatar}
          style={{
            width: '160px',
            height: '160px',
            objectFit: 'cover',
            flex: '0 0 160px',
          }}
        />
        <Row
          gutter={[8, 2]}
          style={{
            flex: '1 1 160px',
          }}
        >
          <Col span={24}>
            <Typography.Title level={5} style={{ marginBottom: 0 }}>
              {fullName}
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Flex gap={8} align="flex-start" wrap="wrap">
              <Typography.Text
                type="secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Icon icon="mdi:account-circle" />
                {position}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Icon icon="mdi:map-marker" />
                {location}
              </Typography.Text>
            </Flex>
          </Col>
          <Col span={24}>
            <Typography.Text type="secondary">Social Networks:</Typography.Text>
            <Flex gap={8} align="flex-start" wrap="wrap">
              {socialNetworks.map((socialNetwork) => (
                <a
                  href={socialNetwork.link}
                  target="_blank"
                  rel="noreferrer"
                  key={socialNetwork.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    lineHeight: '0',
                    padding: '4px 8px',
                    marginBlock: '4px',
                    borderRadius: '6px',
                    border: '1px dashed #d9d9d9',
                    filter: 'grayscale(1)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon icon={socialNetwork.icon} height={20} />
                  <Typography.Text style={{ lineHeight: '24px' }}>
                    {socialNetwork.name}
                  </Typography.Text>
                </a>
              ))}
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Card>
  );
}
