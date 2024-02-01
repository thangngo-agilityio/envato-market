/* eslint-disable no-var */
import { testing } from './jest.setup';

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

type Testing = typeof testing;

declare global {
  var testLibReactUtils: typeof testing;
  var fireEvent: Testing['fireEvent'];
  var screenJest: Testing['screen'];
  var render: Testing['render'];
  var waitFor: Testing['waitFor'];
  var renderHook: Testing['renderHook'];
  var act: Testing['act'];
}

export {};
