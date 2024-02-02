import { useCallback, useMemo, useState } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';

export type TUseSearchParams = ReadonlyURLSearchParams & {
  setSearchParam: (key: string, value: string) => void;
};

export const useSearch = () => {
  const [_, setTrigger] = useState<boolean>(false);
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  /**
   * Handle set search param on url
   * @param key search param name
   * @param value search param value
   */
  const setSearchParam = useCallback(
    (key: string, value: string): void => {
      let newSearchParams: string = '?';
      let isUpdateKey: boolean = false;

      searchParams.forEach((oldValue: string, oldKey: string) => {
        if (!value) return;

        if (oldKey === key) {
          isUpdateKey = true;
          newSearchParams += `${oldKey}=${value}&`;

          return;
        }

        newSearchParams += `${oldKey}=${oldValue}&`;
      });

      if (isUpdateKey) {
        newSearchParams = newSearchParams.substring(
          0,
          newSearchParams.length - 1,
        );
      } else if (value) {
        newSearchParams += `${key}=${value}`;
      }

      const searchValue = `${
        value && newSearchParams.length - 1
          ? newSearchParams
          : window.location.pathname
      }`;

      window.history.pushState(null, '', searchValue);
      if (value) {
        searchParams.set(key, searchValue);

        return;
      }

      searchParams.delete(key);
      /**
       * The hook simulation is re-rendered
       */
      setTrigger((prev) => !prev);
    },

    [searchParams],
  );

  return {
    searchParams,
    setSearchParam,
  };
};
