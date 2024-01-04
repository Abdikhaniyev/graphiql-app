import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import LayoutSidebar from '../../layouts/Sidebar';

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

describe('Coverage tests of Sidebar:', () => {
  test('layout side bar', async () => {
    render(LayoutSidebar());
    expect(screen.queryByTestId('sidebar')).toBeInTheDocument();
  });
});
