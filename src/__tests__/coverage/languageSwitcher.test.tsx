import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import AppRoutes from '../../components/Router';
import { MemoryRouter } from 'react-router-dom';
import { LOCALES } from '../../locales/locales';

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
    <AppRoutes />
  </MemoryRouter>
);

afterEach(() => {
  cleanup();
});

describe('Coverage tests of languageSwitcher:', () => {
  test('basic components', async () => {
    await waitFor(() => render(route('/')));
    const buttonLanguageSwitcher = screen.queryByTestId('language-switcher');
    if (buttonLanguageSwitcher) await waitFor(() => fireEvent.click(buttonLanguageSwitcher));
    await waitFor(() => expect(screen.queryByTestId(`language-${LOCALES.RU}`)).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId(`language-${LOCALES.EN}`)).toBeVisible());
  });
});
