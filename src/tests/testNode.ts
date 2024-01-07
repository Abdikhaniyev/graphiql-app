export const env = (env: string | undefined) => env ?? '';
export const testId = (env: string, id: string) => (env === 'test' ? { 'data-testid': id } : {});
export const testNode = (id: string) => testId(env(import.meta.env.MODE), id);
export const isTest = import.meta.env.MODE === 'test';
