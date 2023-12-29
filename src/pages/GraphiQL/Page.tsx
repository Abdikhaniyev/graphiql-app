import { Col, Row, theme } from 'antd';
import { useCallback, useState } from 'react';
import QueryEditor from './components/QueryEditor';
import EndpointEditor from './components/EndpointEditor';

const { useToken } = theme;

export default function GraphiQL() {
  const { token } = useToken();
  const [value, setValue] = useState('');

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

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
          value={value}
          onChange={onChange}
          height="80vh"
          style={{
            borderRadius: token.borderRadius,
            overflow: 'hidden',
          }}
        />
        {/* TODO: add variable editor and header editor tabs */}
      </Col>
      <Col xs={24} sm={24} md={12}>
        <QueryEditor
          value={value}
          onChange={onChange}
          height="80vh"
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
