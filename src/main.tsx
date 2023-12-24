import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Context, defaultContext } from './store/context.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={defaultContext}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
