export const localStore = (key: string) => ({
  add: <T>(value: T): void => localStorage.setItem(key, JSON.stringify(value)),
});
