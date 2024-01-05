import '@testing-library/jest-dom';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { RULES, updateRuleLocale, rules } from '../../components/AuthForm/rules';
import { LOCALES } from '../../locales/locales';
import { MESSAGES, getMessage } from '../../locales/messages';
import { FormInstance } from 'antd';
import type { ExtendedRule } from '../../components/AuthForm/AuthForm.d';

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

describe('Coverage tests of form validation rules:', () => {
  test('basic form rules', async () => {
    expect(RULES).toBeDefined();
    const definedRules = [RULES.EMAIL, RULES.PASSWORD, RULES.PASSWORD_CONFIRM];
    const locales: LOCALES[] = Object.keys(LOCALES).map((val: string) => Number(val));
    locales.length = locales.length >> 1;
    locales.forEach((locale) => {
      updateRuleLocale(definedRules, locale);
      definedRules.forEach(async (ruleKey) => {
        rules[ruleKey]?.forEach(async (rule: ExtendedRule) => {
          if (typeof rule === 'object') {
            const messageKeyExists = rule.messageKey in MESSAGES;
            const messageText = getMessage(rule.messageKey, locale);
            expect(messageKeyExists).toBeTruthy();
            expect(messageText).toEqual(rule.message);
          }
          if (typeof rule === 'function') {
            [
              {
                value: ' password1 ',
                email: 'email1',
                password: ' password1 ',
                passwordConfirm: 'password1',
                messageKey: Object(rules[ruleKey])[0].messageKey,
              },
              {
                value: ' password2 ',
                email: 'email2',
                password: ' password2 ',
                passwordConfirm: 'password3',
                messageKey: Object(rules[ruleKey])[0].messageKey,
              },
              {
                value: 'password2',
                email: 'email2',
                password: 'password2',
                passwordConfirm: 'password3',
                messageKey: Object(rules[ruleKey])[0].messageKey,
              },
            ].forEach(async ({ value, email, password, passwordConfirm, messageKey }) => {
              const fields = { email, password, passwordConfirm };
              const returnFieldValue = (name: string) => (name ? Object(fields)[name] : '');
              const { validator } = rule({ getFieldValue: returnFieldValue } as FormInstance);
              if (validator) {
                const result = await (async () => {
                  try {
                    await validator({}, value, () => {});
                  } catch (e) {
                    return e;
                  }
                })();
                if (result) expect(result).toEqual(getMessage(messageKey, locale));
              }
            });
          }
        });
      });
    });
  });
});
