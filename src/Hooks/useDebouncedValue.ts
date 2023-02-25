import { useRef, useState } from 'react';

type DebouncedValue = <T>(
  initialState: T | (() => T),
  customTimeout?: number
) => [T, (value: T | (() => T)) => void];

export const useDebouncedValue: DebouncedValue = (
  initialState,
  customTimeout
) => {
  const [value, setValue] = useState(initialState);
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const setDebouncedValue = (newValue: typeof initialState) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setValue(newValue);
    }, customTimeout || 200);
  };

  return [value, setDebouncedValue];
};
