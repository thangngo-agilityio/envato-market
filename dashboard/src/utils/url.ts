/**
 * Convert object to searchParam (e.g { name: value } => '?name=value')
 * @param objSearchParam (e.g { name: value })
 * @returns value after convert (e.g '?name=value')
 */
export const getSearchParam = (objSearchParam: object): string => {
  const searchParam: string = Object.entries(objSearchParam)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${searchParam}`;
};

/**
 * Delete attributes whose value is empty
 * @param searchParam (e.g { name: value, age: '' })
 * @returns value after handle (e.g { name: value })
 */
export const cleanUpSearchParam = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParam: Record<string, any>,
): Record<string, string> => {
  const searchParamAfterClean: Record<string, string> = {};

  Object.entries(searchParam).forEach(([key, value]) => {
    const isEmpty: boolean = ['', null, undefined].includes(value);

    if (!isEmpty) {
      searchParamAfterClean[key] = `${value}`;
    }
  });

  return searchParamAfterClean;
};
