import { useCallback, useEffect, useRef } from 'react';

type DebouncedFunction = <T extends unknown[]>(
  func: (...args: T) => void,
  customTimeout?: number
) => (...args: T) => void;

export const useDebouncedFunction: DebouncedFunction = <T extends unknown[]>(
  func: (...args: T) => void,
  customTimeout = 200
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
    [func, customTimeout]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};
