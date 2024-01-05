import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { env, testId, testNode } from '../../tests/testNode';

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

describe('Coverage tests of test component:', () => {
  test('test component functions', async () => {
    expect(env('test')).toEqual('test');
    expect(env(undefined)).toEqual('');
    expect(testId('test', '')['data-testid']).toEqual('');
    expect(testId('', '')['data-testid']).toBeFalsy();
    expect(testNode('')['data-testid']).toEqual('');
  });
});
