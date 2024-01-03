import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Context, defaultContext } from './store/context.ts';
import { setupStore } from './redux/store.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Context.Provider value={defaultContext}>
          <App />
        </Context.Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
