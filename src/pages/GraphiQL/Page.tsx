import { testNode } from '../../tests/testNode';
import { Icon } from '@iconify/react';
import { Button, Col, Row, Tabs, TabsProps, message, theme } from 'antd';
import debounce from 'lodash.debounce';
import { useCallback, useContext, useState } from 'react';
import { useLazyGetCustomQueryQuery } from '../../redux/actions/graphql';
import { setHeaders, setQuery, setResult, setVariables } from '../../redux/slices/QuerySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import EndpointEditor from './components/EndpointEditor';
import QueryEditor from './components/QueryEditor';
import { Context } from '../../store/context';
import { KEYS as TEXT, getText } from '../../locales/text';

const { useToken } = theme;

export default function GraphiQL() {
  const { locale } = useContext(Context);
  const [showTabs, setShowTabs] = useState(false);
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
      label: getText(TEXT.VARIABLES, locale),
      children: showTabs ? (
        <QueryEditor
          placeholder={getText(TEXT.VARIABLES_PLACEHOLDER, locale)}
          value={variables}
          onChange={onChangeVariables}
          height={'20vh'}
        />
      ) : null,
    },
    {
      key: '2',
      label: getText(TEXT.HEADERS, locale),
      children: showTabs ? (
        <QueryEditor
          placeholder={getText(TEXT.HEADERS_PLACEHOLDER, locale)}
          value={headers}
          onChange={onChangeHeaders}
          height={'20vh'}
        />
      ) : null,
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
      {...testNode('playground')}
    >
      {contextHolder}
      <Col
        xs={24}
        sm={24}
        md={12}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}
      >
        <EndpointEditor />
        <QueryEditor
          placeholder={getText(TEXT.QUERY_PLACEHOLDER, locale)}
          value={query}
          onChange={onChangeQuery}
          onClickRun={onClickRun}
          height="100%"
        />
        <Tabs
          items={items}
          onTabClick={() => {
            if (!showTabs) setShowTabs(true);
          }}
          tabBarExtraContent={{
            right: (
              <Button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                icon={
                  showTabs ? (
                    <Icon icon={'fluent:chevron-down-16-regular'} />
                  ) : (
                    <Icon icon={'fluent:chevron-up-16-regular'} />
                  )
                }
                onClick={() => {
                  setShowTabs(!showTabs);
                }}
                {...testNode('graphql-right')}
              />
            ),
          }}
        />
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
