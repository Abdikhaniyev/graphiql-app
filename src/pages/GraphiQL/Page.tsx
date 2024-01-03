import { Col, Row, Tabs, TabsProps, theme } from 'antd';
import { useCallback } from 'react';
import { setHeaders, setQuery, setVariables } from '../../redux/slices/QuerySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import EndpointEditor from './components/EndpointEditor';
import QueryEditor from './components/QueryEditor';

const { useToken } = theme;

export default function GraphiQL() {
  const { token } = useToken();
  const { query, result, variables, headers } = useAppSelector((state) => state.query);
  const dispatch = useAppDispatch();

  const onChangeQuery = useCallback((val: string) => {
    dispatch(setQuery(val));
  }, []);

  const onChangeVariables = useCallback((val: string) => {
    dispatch(setVariables(val));
  }, []);

  const onChangeHeaders = useCallback((val: string) => {
    dispatch(setHeaders(val));
  }, []);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Variables',
      children: <QueryEditor value={variables} onChange={onChangeVariables} height="20vh" />,
    },
    {
      key: '2',
      label: 'Headers',
      children: <QueryEditor value={headers} onChange={onChangeHeaders} height="20vh" />,
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
          value={query}
          onChange={onChangeQuery}
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
          value={result}
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
