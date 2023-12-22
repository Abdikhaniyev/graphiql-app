import type { Auth } from '../firebase.d';
import type { AuthMethodKeys } from './methods.d';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export enum KEYS {
  NOTHING = 0,
  SIGN_OUT,
  SIGN_UP,
  SIGN_IN,
  DEFAULT = NOTHING,
}

const keys: KEYS[] = Object.keys(KEYS).map((val: string) => Number(val));
keys.length = keys.length >> 1;

const methods: AuthMethodKeys = {
  [KEYS.NOTHING]: undefined,
  [KEYS.SIGN_OUT]: signOut,
  [KEYS.SIGN_UP]: createUserWithEmailAndPassword,
  [KEYS.SIGN_IN]: signInWithEmailAndPassword,
};

export const method = (key: KEYS = KEYS.NOTHING, ...params: [Auth, string, string]) => {
  const method = methods[key];
  if (method) return method(...params);
};
