import '@testing-library/jest-dom';
import { describe, expect, test, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { reactElement } from '../../main';
import { default as Playground } from './../../pages/Playground/Page';
import { default as Welcome } from './../../pages/Welcome/Page';

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
  test('basic tab components', async () => {
    expect(reactElement).toBeDefined();
    expect(Playground).toBeDefined();
    expect(Welcome).toBeDefined();
  });
  test('render playground', async () => {
    render(Playground());
    expect(screen.queryByTestId('playground')).toBeInTheDocument();
  });
  test('render app', async () => {
    render(reactElement);
    expect(screen.queryByTestId('welcome')).toBeInTheDocument();
  });
});
