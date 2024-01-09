import { useCallback, useRef, useState } from 'react';

// Types
import type { TTypeToast } from '@app/components/Toast';

type TUseToast = {
  type?: TTypeToast;
  message?: string;
};

export const useToast = (options?: TUseToast) => {
  const [toast, setToast] = useState<TUseToast>(
    Object.assign({ type: 'success', message: '' }, options),
  );
  const refTimeout = useRef<NodeJS.Timeout | number>();

  const resetToast = useCallback(() => {
    refTimeout.current = setTimeout(
      () => setToast({ type: 'success', message: '' }),
      2000,
    );
  }, []);

  const pauseToast = useCallback(() => {
    clearTimeout(refTimeout.current);
  }, []);

  const showToast = useCallback(
    (options?: TUseToast) => {
      if (options) {
        setToast((prev) => ({ ...prev, ...options }));
        resetToast();

        return;
      }
    },
    [resetToast],
  );

  return {
    toast,
    timeoutId: refTimeout.current,
    showToast,
    resetToast,
    pauseToast,
  };
};
