export const getValueFromLocalStore = (key: string): string =>
  localStorage.getItem(key) || '';
