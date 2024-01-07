import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import AppRoutes from '../../components/Router.tsx';
import { MemoryRouter } from 'react-router-dom';

import { setupStore } from '../../redux/store.ts';
import { Provider } from 'react-redux';
import { Context, defaultContext } from '../../store/context.ts';
import * as Pages from '../../pages';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import LayoutSidebar from '../../layouts/Sidebar.tsx';
import Documentation from '../../pages/GraphiQL/components/Documentation.tsx';

const store = setupStore();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const route = (init: string, Routes = AppRoutes) => (
  <MemoryRouter initialEntries={[init]}>
    <Provider store={store}>
      <Context.Provider value={defaultContext}>
        <Routes />
      </Context.Provider>
    </Provider>
  </MemoryRouter>
);

const graphQLRoute = () => (
  <Routes>
    <Route
      path={ROUTES.PLAYGROUND}
      element={
        <>
          <Pages.GraphiQL />
          <LayoutSidebar />
          <Documentation />
        </>
      }
    />
  </Routes>
);
const testNodes = [
  'playground',
  'graphql-run',
  'graphql-format',
  'graphql-clear',
  'graphql-clear',
  'graphql-right',
  'endpoint-edit',
  'endpoint-save',
];

afterEach(() => {
  cleanup();
});

describe('Coverage tests of routes:', () => {
  test('home route', async () => {
    waitFor(() => render(route('/')));
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
  });
  test('playground routes', async () => {
    waitFor(() => render(route('/playground2')));
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
  });
  test('playground routes', async () => {
    waitFor(() => render(route('/playground')));

    const signUp = screen.queryByTestId(`auth-button-1`);
    waitFor(() => expect(signUp).toBeTruthy());
    if (signUp) waitFor(() => fireEvent.click(signUp));

    const buttonSubmit = screen.queryByTestId('button-submit');
    waitFor(() => expect(buttonSubmit).toBeInTheDocument());
    waitFor(() => expect(buttonSubmit).toBeTruthy());
    const inputPassword = screen.queryByTestId('input-password');
    waitFor(() => expect(inputPassword).toBeTruthy());
    waitFor(() => expect(inputPassword).toBeInTheDocument());
    const inputPasswordConfirm = screen.queryByTestId('input-password-confirm');
    waitFor(() => expect(inputPasswordConfirm).toBeTruthy());
    waitFor(() => expect(inputPasswordConfirm).toBeInTheDocument());
  });
  test('playground routes', async () => {
    waitFor(() => render(route(ROUTES.PLAYGROUND, graphQLRoute)));
    testNodes.forEach((testNode) => {
      const node = screen.queryByTestId(testNode);
      expect(node).toBeTruthy();
      waitFor(() => expect(node).toBeInTheDocument());
      if (node) waitFor(() => fireEvent.click(node));
    });
    const buttonOpen = screen.queryByTestId('button-sidebar-open');
    waitFor(() => expect(buttonOpen).toBeInTheDocument());
    expect(buttonOpen).toBeTruthy();
    if (buttonOpen) waitFor(() => fireEvent.click(buttonOpen));
    const documentation = screen.queryByTestId('documentation');
    waitFor(() => expect(documentation).toBeInTheDocument());
  });
});
