import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth, AuthResult } from '../firebase.d';
import { method, KEYS } from '../methods/methods';

export const useAuth = (auth: Auth, type: KEYS = KEYS.DEFAULT): AuthResult => {
  const authMethod = (email: string, password: string) => method(type, auth, email, password);
  return [...useAuthState(auth), authMethod];
};
