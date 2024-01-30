import '@testing-library/jest-dom';
import React from 'react';
import * as jestFunc from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

// Themes
import { configThemes } from './app/ui/themes';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));
jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(),
}));

const customRender = <
  Q extends jestFunc.Queries = typeof jestFunc.queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactElement,
  options?: jestFunc.RenderOptions<Q, Container, BaseElement>,
) =>
  jestFunc.render(ui, {
    ...options,
    wrapper: ({ children }: { children: React.ReactElement }) => {
      const CustomWrapper = options?.wrapper
        ? options.wrapper
        : ({ children }: { children: React.ReactElement }) => children;

      return (
        <ChakraProvider theme={configThemes}>
          <CustomWrapper>{children}</CustomWrapper>
        </ChakraProvider>
      );
    },
  });

globalThis.testLibReactUtils = {
  ...jestFunc,
  render: customRender,
};

export const testing = { ...jestFunc, render: customRender };
