// Utils
import { getValueFromLocalStore } from '@/lib/utils';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('getValueFromLocalStore', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('gets value from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    mockLocalStorage.setItem(key, value);
    const result = getValueFromLocalStore(key);

    expect(result).toBe(value);
  });

  it('returns an empty string for non-existent key', () => {
    const result = getValueFromLocalStore('nonExistentKey');

    expect(result).toBe('');
  });
});
