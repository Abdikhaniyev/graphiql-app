import { Col, Row, Tabs, TabsProps, theme } from 'antd';
import { useCallback, useState } from 'react';
import EndpointEditor from './components/EndpointEditor';
import QueryEditor from './components/QueryEditor';

const { useToken } = theme;

export default function GraphiQL() {
  const { token } = useToken();
  const [value, setValue] = useState('');

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Variables',
      children: <QueryEditor value="" onChange={() => {}} height="20vh" />,
    },
    {
      key: '2',
      label: 'Headers',
      children: <QueryEditor value="" onChange={() => {}} height="20vh" />,
    },
  ];

  return (
    <Row
      gutter={[8, 8]}
      style={{
        flex: '1',
        padding: token.paddingSM,
        backgroundColor: token.colorBgLayout,
        borderRadius: token.borderRadiusLG,
      }}
    >
      <Col xs={24} sm={24} md={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <EndpointEditor />
        <QueryEditor
          placeholder={'Enter your query here'}
          value={value}
          onChange={onChange}
          height="50vh"
          style={{
            borderRadius: token.borderRadius,
            overflow: 'hidden',
          }}
        />
        <Tabs items={items} />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <QueryEditor
          value={value}
          onChange={onChange}
          editable={false}
          readOnly
          basicSetup={{
            lineNumbers: false,
            highlightActiveLine: false,
          }}
        />
      </Col>
    </Row>
  );
}
