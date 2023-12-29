import { Icon } from '@iconify/react';
import { Button, Flex, Input, Typography } from 'antd';
import { useState } from 'react';

export default function EndpointEditor() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('https://rickandmortyapi.com/graphql');

  const save = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <Flex gap={8} align="center" style={{ width: '100%' }}>
        <Input style={{ flex: '1' }} value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={save}
          type="primary"
          icon={<Icon icon={'fluent:checkmark-16-regular'} width={20} />}
        />
      </Flex>
    );
  }

  return (
    <Flex gap={8} align="center" style={{ width: '100%' }}>
      <Typography.Paragraph
        ellipsis
        style={{
          flex: '1',
          margin: 0,
          color: '#1c83de',
          paddingInline: '12px',
        }}
      >
        {value}
      </Typography.Paragraph>
      <Button
        onClick={() => setEditing(true)}
        icon={<Icon icon={'fluent:edit-16-regular'} width={20} />}
      />
    </Flex>
  );
}
