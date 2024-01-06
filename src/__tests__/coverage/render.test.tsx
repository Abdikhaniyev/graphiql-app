import '@testing-library/jest-dom';
import { describe, expect, test, afterEach, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { reactElement } from '../../main';

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

afterEach(() => {
  cleanup();
});

describe('Coverage tests:', () => {
  test('main component', async () => {
    expect(reactElement).toBeDefined();
  });
  test('render app', async () => {
    await waitFor(() => render(reactElement));
    expect(screen.queryByTestId('welcome')).toBeInTheDocument();
  });
});
