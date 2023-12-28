import { useState } from 'react';
import { Context, defaultContext } from './store/context';
import { Router } from './components';
import { ConfigProvider } from 'antd';
import antConfig from './antConfig';
import { locales } from './locales/locales';

function App() {
  const [locale, setLocale] = useState(defaultContext.locale);
  const contextValue = { ...defaultContext, locale, setLocale };

  return (
    <Context.Provider value={contextValue}>
      <ConfigProvider
        locale={locales[defaultContext.locale]}
        theme={{
          ...antConfig,
        }}
      >
        <Router />;
      </ConfigProvider>
    </Context.Provider>
  );
}

export default App;
