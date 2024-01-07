import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryState } from './QuerySlice.d';

const initialState: QueryState = {
  endpoint: localStorage.getItem('gql-endpoint') || 'https://rickandmortyapi.com/graphql',
  query: `query GetCharacters  ($page: Int = 1) {
    characters(page: $page) {
      results {
        name
      }
    }
  }
  `,
  variables: '{"page": 1}',
  headers: '{"test": "test"}',
  result: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setEndpoint: (state, action: PayloadAction<string>) => {
      localStorage.setItem('gql-endpoint', action.payload);
      state.endpoint = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
  },
});

export const { setEndpoint, setQuery, setVariables, setHeaders, setResult } = querySlice.actions;
export default querySlice.reducer;
