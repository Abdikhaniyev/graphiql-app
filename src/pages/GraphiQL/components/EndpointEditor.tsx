import { testNode } from '../../../tests/testNode';
import { Icon } from '@iconify/react';
import { Button, Flex, Input, Typography } from 'antd';
import { ChangeEvent, useContext, useState } from 'react';
import { setEndpoint } from '../../../redux/slices/QuerySlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Context } from '../../../store/context';
import { KEYS as TEXT, getText } from '../../../locales/text';

export default function EndpointEditor() {
  const { locale } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const endpoint = useAppSelector((state) => state.query.endpoint);
  const dispatch = useAppDispatch();

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(e.target.value));
  };

  const save = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <Flex gap={8} align="center" style={{ width: '100%' }}>
        <Input
          placeholder={getText(TEXT.ENDPOINT_PLACEHOLDER, locale)}
          style={{ flex: '1' }}
          value={endpoint}
          onChange={setValue}
        />
        <Button
          onClick={save}
          type="primary"
          icon={<Icon icon={'fluent:checkmark-16-regular'} width={20} />}
          {...testNode('endpoint-save')}
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
        {endpoint}
      </Typography.Paragraph>
      <Button
        onClick={() => setEditing(true)}
        icon={<Icon icon={'fluent:edit-16-regular'} width={20} />}
        {...testNode('endpoint-edit')}
      />
    </Flex>
  );
}
