import { Icon } from '@iconify/react';
import createTheme from '@uiw/codemirror-themes';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { Button, Flex, theme } from 'antd';
import { useCallback } from 'react';

const { useToken } = theme;

interface QueryEditorProps extends ReactCodeMirrorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  onClickRun?: () => void;
}

export default function QueryEditor({
  value,
  onChange,
  readOnly,
  onClickRun,
  ...props
}: QueryEditorProps) {
  const { token } = useToken();
  const readOnlyTheme = createTheme({
    theme: 'light',
    settings: {
      background: 'transparent',
      gutterBackground: 'transparent',
      fontFamily: token.fontFamily,
      selectionMatch: token.colorPrimaryBgHover,
      lineHighlight: token.colorPrimaryBg,
    },
    styles: [],
  });

  const defaultTheme = createTheme({
    theme: 'light',
    settings: {
      background: token.colorBgContainer,
      gutterBackground: token.colorBgContainer,
      fontFamily: token.fontFamily,
      selectionMatch: token.colorPrimaryBgHover,
      lineHighlight: token.colorPrimaryBg,
    },
    styles: [],
  });

  const clear = useCallback(() => {
    if (!onChange) return;
    onChange('');
  }, [onChange]);

  const formatGraphQL = useCallback((value: string) => {
    if (!onChange) return;
    let indentation = 1;
    let formatted = '';
    value = value.replaceAll('\t', '').replaceAll(' ', '');

    value.split('\n').forEach((line) => {
      if (line.match(/\s*[}]\s*/)) {
        indentation -= 1;
      }

      formatted += `${'\t'.repeat(indentation)}${line}\n`;

      if (line.match(/\s*[{]\s*/)) {
        indentation += 1;
      }
    });

    onChange(formatted.trim());
  }, []);

  return (
    <Flex gap={8} style={{ width: '100%' }}>
      <CodeMirror
        value={value}
        onChange={onChange}
        height="80vh"
        editable={!readOnly}
        readOnly={readOnly}
        theme={readOnly ? readOnlyTheme : defaultTheme}
        {...props}
        style={{
          flex: '1',
          ...props.style,
        }}
      />
      {!readOnly && (
        <Flex vertical gap={8}>
          {onClickRun && (
            <Button
              type="primary"
              icon={<Icon width="20" icon={'fluent:play-16-regular'} />}
              onClick={onClickRun}
            />
          )}
          <Button
            icon={<Icon width="20" icon={'fluent:text-grammar-wand-16-regular'} />}
            onClick={() => {
              formatGraphQL(value);
            }}
          />
          <Button icon={<Icon width="20" icon={'fluent:dismiss-16-regular'} />} onClick={clear} />
        </Flex>
      )}
    </Flex>
  );
}
