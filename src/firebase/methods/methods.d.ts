import type { AuthMethod } from '../firebase.d';
import { KEYS } from './methods';

export type Keys<T = AuthMethod> = Partial<Record<KEYS, T>>;
export type AuthMethodKeys = Keys<AuthMethod>;
