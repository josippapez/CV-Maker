import { useCallback, useEffect, useRef } from 'react';

type DebouncedFunction = <T extends unknown[]>(
  func: (...args: T) => void,
  customTimeout?: number,
  customDependencies?: unknown[]
) => [(...args: T) => void, () => void];

export const useDebouncedFunction: DebouncedFunction = <T extends unknown[]>(
  func: (...args: T) => void,
  customTimeout = 300,
  customDependencies: unknown[] = []
) => {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedFunction = useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, customTimeout);
    },
    [func, customTimeout, customDependencies]
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedFunction, clear];
};
