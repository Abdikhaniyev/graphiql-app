import '@testing-library/jest-dom';
import { describe, expect, test, afterEach, vi } from 'vitest';
import { cleanup, waitFor, render, screen } from '@testing-library/react';
import {
  emptyForm as Empty,
  emailForm as Email,
  passwordForm as Password,
  passwordConfirmForm as PasswordConfirm,
  submitButtonForm as Submit,
} from '../../components/AuthForm/forms';
import { Form } from 'antd';

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

vi.mock('react', async () => {
  const react = await vi.importActual('react');
  return {
    ...react,
    useLayoutEffect: react.useEffect,
  };
});

afterEach(() => {
  cleanup();
});

const check = (value: JSX.Element): JSX.Element => {
  return <Form>{value}</Form>;
};

describe('Coverage tests of forms:', () => {
  test('check forms and parameters', async () => {
    expect(Empty).toBeDefined();
    expect(Email).toBeDefined();
    expect(Password).toBeDefined();
    expect(PasswordConfirm).toBeDefined();
    expect(Submit).toBeDefined();

    await waitFor(() => render(check(<Email placeholder="Email" rules={[{ messageKey: 1 }]} />)));
    await waitFor(() => expect(screen.queryByTestId('input-email')).toBeInTheDocument());

    await waitFor(() =>
      render(check(<Password placeholder="Password" rules={[{ messageKey: 1 }]} />))
    );
    await waitFor(() => expect(screen.queryByTestId('input-password')).toBeInTheDocument());

    await waitFor(() =>
      render(check(<PasswordConfirm placeholder="PasswordConfirm" rules={[{ messageKey: 1 }]} />))
    );
    await waitFor(() => expect(screen.queryByTestId('input-password-confirm')).toBeInTheDocument());

    await waitFor(() => render(check(<Submit labelSubmit="Submit" />)));
    await waitFor(() => expect(screen.queryByTestId('button-submit')).toBeInTheDocument());
  });
});
