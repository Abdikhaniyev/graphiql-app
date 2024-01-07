import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { setupStore } from './redux/store.ts';
import { Context, defaultContext } from './store/context.ts';
import { Alert } from 'antd';

const { ErrorBoundary } = Alert;
const store = setupStore();

const reactElement = (
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <Context.Provider value={defaultContext}>
            <App />
          </Context.Provider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
const root = document.getElementById('root') ?? document.createElement('div');
createRoot(root).render(reactElement);

export { reactElement, root };
