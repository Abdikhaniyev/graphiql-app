import 'antd/dist/reset.css';
import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Context, defaultContext } from './store/context.ts';
import { setupStore } from './redux/store.ts';

const store = setupStore();

const reactElement = (
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Context.Provider value={defaultContext}>
          <App />
        </Context.Provider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
const root = document.getElementById('root') ?? document.createElement('div');
createRoot(root).render(reactElement);

export { reactElement, root };
