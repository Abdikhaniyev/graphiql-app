import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import ru_RU from 'antd/locale/ru_RU';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import antConfig from './antConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        locale={ru_RU}
        theme={{
          ...antConfig,
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
