import { Col, Row, Tabs, TabsProps, message, theme } from 'antd';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useLazyGetCustomQueryQuery } from '../../redux/actions/graphql';
import { setHeaders, setQuery, setResult, setVariables } from '../../redux/slices/QuerySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import EndpointEditor from './components/EndpointEditor';
import QueryEditor from './components/QueryEditor';

const { useToken } = theme;

export default function GraphiQL() {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useToken();
  const { query, result, variables, headers } = useAppSelector((state) => state.query);
  const dispatch = useAppDispatch();
  const [fetchQuery] = useLazyGetCustomQueryQuery();

  const debouncedDispatch = debounce((action, value) => {
    dispatch(action(value));
  }, 500);

  const onChangeQuery = useCallback((val: string) => debouncedDispatch(setQuery, val), []);

  const onChangeVariables = useCallback((val: string) => debouncedDispatch(setVariables, val), []);

  const onChangeHeaders = useCallback((val: string) => debouncedDispatch(setHeaders, val), []);

  const onClickRun = useCallback(() => {
    fetchQuery({ query: query, variables: variables })
      .unwrap()
      .then((res) => {
        dispatch(setResult(JSON.stringify(res, null, 2)));
      })
      .catch((err) => {
        messageApi.error('Ошибка запроса');
        console.error(err);
        dispatch(setResult(''));
      });
  }, [query, variables, fetchQuery]);

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
      {contextHolder}
      <Col xs={24} sm={24} md={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <EndpointEditor />
        <QueryEditor
          placeholder={'Enter your query here'}
          value={query}
          onChange={onChangeQuery}
          onClickRun={onClickRun}
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
