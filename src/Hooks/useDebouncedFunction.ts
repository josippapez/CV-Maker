import { useCallback, useRef } from 'react';

type DebouncedFunction = (
  initialFunction: () => void,
  customTimeout?: number
) => () => void;

export const useDebouncedFunction: DebouncedFunction = (
  initialFunction,
  customTimeout
) => {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedFunction = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      initialFunction();
    }, customTimeout || 200);
  }, []);

  return debouncedFunction;
};
