import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { DocumentNode, getIntrospectionQuery } from 'graphql';
import { ClientError, gql } from 'graphql-request';
import type { RootState } from '../store';

const dynamicBaseQuery: BaseQueryFn<
  {
    document: string | DocumentNode;
    variables?: string;
  },
  unknown,
  unknown,
  Partial<Pick<ClientError, 'request' | 'response'>>
> = async (args, api, extraOptions) => {
  const endpoint = (api.getState() as RootState).query.endpoint;
  if (!endpoint) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No received endpoint',
      },
    };
  }

  const rawBaseQuery = graphqlRequestBaseQuery<Partial<ClientError>>({
    url: `${endpoint}`,
    prepareHeaders: (headers) => {
      const headersString = (api.getState() as RootState).query.headers;
      if (headersString) {
        const headersObject = JSON.parse(headersString);

        return {
          ...headers,
          ...headersObject,
        };
      }
      return headers;
    },
  });
  return rawBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getCustomQuery: builder.query({
      query: ({ query, variables }) => ({
        document: gql`
          ${query}
        `,
        variables: JSON.parse(variables),
      }),
    }),
    getCustomQuerySchema: builder.query({
      queryFn: async (_args, api, extraOptions) => {
        const introspectionQuery = getIntrospectionQuery();
        const { data, error } = await dynamicBaseQuery(
          {
            document: introspectionQuery,
          },
          api,
          extraOptions
        );
        if (error) {
          return { error };
        }
        const schema = data;
        return {
          data: schema,
        };
      },
    }),
  }),
});

export const {
  useGetCustomQueryQuery,
  useLazyGetCustomQueryQuery,
  useGetCustomQuerySchemaQuery,
  useLazyGetCustomQuerySchemaQuery,
} = api;
