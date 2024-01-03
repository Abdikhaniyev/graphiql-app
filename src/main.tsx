import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Context, defaultContext } from './store/context.ts';

const reactElement = (
  <StrictMode>
    <BrowserRouter>
      <Context.Provider value={defaultContext}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </StrictMode>
);
const root = document.getElementById('root') ?? document.createElement('div');
createRoot(root).render(reactElement);

export { reactElement, root };
