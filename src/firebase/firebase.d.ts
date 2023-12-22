import type { UserCredential, Auth } from 'firebase/auth';
import { AuthStateHook } from 'react-firebase-hooks/auth';

export type ExtraAuthMethod = (
  email: string,
  password: string
) => Promise<UserCredential> | Promise<void> | undefined;
export type AuthMethod = (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential> | Promise<void> | undefined;
export type AuthResult = [...AuthStateHook, ExtraAuthMethod];
export type Auth = Auth;
