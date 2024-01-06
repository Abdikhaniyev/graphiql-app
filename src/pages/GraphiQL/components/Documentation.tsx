import { Button, Drawer, Flex, Typography, message } from 'antd';
import {
  GraphQLNamedType,
  GraphQLObjectType,
  IntrospectionQuery,
  buildClientSchema,
} from 'graphql';
import { ObjMap } from 'graphql/jsutils/ObjMap';
import { Fragment, useContext, useEffect, useState } from 'react';
import { MESSAGES, getMessage } from '../../../locales/messages';
import { KEYS as TEXT, getText } from '../../../locales/text';
import { useLazyGetCustomQuerySchemaQuery } from '../../../redux/actions/graphql';
import { Context } from '../../../store/context';

type TypeMap = ObjMap<GraphQLNamedType>;

export default function Documentation() {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<GraphQLObjectType | null>(null);
  const [fetchSchema] = useLazyGetCustomQuerySchemaQuery({});
  const [typeMap, setTypeMap] = useState<TypeMap | null>(null);
  const { locale } = useContext(Context);

  useEffect(() => {
    fetchSchema({})
      .unwrap()
      .then((data) => buildClientSchema(data as IntrospectionQuery).getTypeMap())
      .then((schema) => {
        setTypeMap(schema);
      })
      .catch(() => {
        messageApi.error(getMessage(MESSAGES.API_SCHEMA_ERROR, locale));
      });
  }, [fetchSchema]);

  return (
    <Flex vertical>
      {contextHolder}
      <Typography.Title level={5}>{getText(TEXT.DOCUMENTATION, locale)}</Typography.Title>
      <Typography.Text type="secondary">{getText(TEXT.SCHEMA_TYPES, locale)}</Typography.Text>

      {typeMap && (
        <Flex vertical>
          {Object.values(typeMap)
            .filter((type) => !type.name.includes('__'))
            .map((type) => (
              <Button
                type="text"
                key={type.name}
                style={{ textAlign: 'left' }}
                onClick={() => {
                  setOpen(!open);
                  setType(type as GraphQLObjectType);
                }}
              >
                {type.name}
              </Button>
            ))}
        </Flex>
      )}

      <Drawer
        placement="left"
        closable={false}
        onClose={() => setOpen(!open)}
        open={open}
        width={280}
      >
        <Typography.Title level={5}>{type?.name}</Typography.Title>
        <Typography.Text type="secondary">{type?.description}</Typography.Text>

        {type?.getFields && (
          <>
            <Typography.Title level={5}>{getText(TEXT.FIELDS, locale)}</Typography.Title>
            <Flex vertical>
              {Object.values(type?.getFields())?.map((field) => (
                <Fragment key={field.name}>
                  <Typography.Text>
                    {field.name}: {field.type.toString()}
                  </Typography.Text>
                  <Typography.Paragraph type="secondary">{field.description}</Typography.Paragraph>
                </Fragment>
              ))}
            </Flex>
          </>
        )}
      </Drawer>
    </Flex>
  );
}
