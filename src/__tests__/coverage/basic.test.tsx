import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { reactElement } from '../../main';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Basic coverage test:', () => {
  test('react element endpoint', async () => {
    expect(reactElement).toBeDefined();
  });
});
