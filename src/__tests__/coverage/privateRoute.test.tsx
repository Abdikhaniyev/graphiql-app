import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import AppRoutes from '../../components/Router.tsx';
import { MemoryRouter } from 'react-router-dom';
import { method, KEYS } from '../../firebase/methods/methods.ts';
import { auth } from '../../firebase/firebase.ts';

import { setupStore } from '../../redux/store.ts';
import { Provider } from 'react-redux';
import { Context, defaultContext } from '../../store/context.ts';

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

const route = (init: string) => (
  <MemoryRouter initialEntries={[init]}>
    <Provider store={store}>
      <Context.Provider value={defaultContext}>
        <AppRoutes />
      </Context.Provider>
    </Provider>
  </MemoryRouter>
);

afterEach(() => {
  cleanup();
});

describe('Coverage tests of routes:', () => {
  test('home route', async () => {
    render(route('/'));
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
  });
  test('playground routes', async () => {
    render(route('/playground2'));
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
  });
  test('playground routes', async () => {
    render(route('/playground'));
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
  });

  test('render routes', async () => {
    render(route('/playground'));
    waitFor(() => expect(screen.queryByTestId('private-route-loading')).toBeInTheDocument());
    waitFor(() => expect(screen.queryByTestId('private-route-loading')).toBeFalsy());
    waitFor(() => expect(screen.queryByTestId('playground')).toBeFalsy());
    waitFor(() => expect(screen.queryByTestId('welcome')).toBeInTheDocument());
    const buttonSignIn = screen.queryByTestId('auth-button-2');
    if (buttonSignIn) fireEvent.click(buttonSignIn);
    waitFor(() => expect(buttonSignIn).toBeInTheDocument());
    const buttonSubmit = screen.queryByTestId('button-submit');
    waitFor(() => expect(buttonSubmit).toBeInTheDocument());
    const inputEmail = screen.queryByTestId('input-email');
    waitFor(() => expect(inputEmail).toBeInTheDocument());
    const inputPassword = screen.queryByTestId('input-password');
    waitFor(() => expect(inputPassword).toBeInTheDocument());
    const inputPasswordConfirm = screen.queryByTestId('input-password-confirm');
    waitFor(() => expect(inputPasswordConfirm).toBeInTheDocument());

    waitFor(() => expect(method(KEYS.NOTHING, auth, '', '')).toBeFalsy());
    waitFor(() => expect(method(KEYS.SIGN_OUT, auth, '', '')).toBeFalsy());
    const signUp = screen.queryByTestId(`auth-button-1`);
    if (signUp) waitFor(() => fireEvent.click(signUp));
  });
});
