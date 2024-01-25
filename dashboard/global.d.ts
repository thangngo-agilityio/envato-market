import { testing } from './jest.setup';

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  // eslint-disable-next-line no-var
  var testLibReactUtils: typeof testing;
}

export {};
