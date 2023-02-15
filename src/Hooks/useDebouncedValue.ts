import { useRef, useState, useCallback } from 'react';

type DebouncedValue = <T>(
  initialState: T | (() => T),
  { timeout }?: { timeout?: number }
) => [T, (value: T | (() => T)) => void];

export const useDebouncedValue: DebouncedValue = (initialState, option) => {
  const [value, setValue] = useState(initialState);
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleChange = (
    newValue: typeof initialState,
    setValue: React.Dispatch<React.SetStateAction<typeof value>>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setValue(newValue);
    }, option?.timeout || 200);
  };

  const setDebouncedValue = useCallback((newValue: typeof initialState) => {
    handleChange(newValue, setValue);
  }, []);

  return [value, setDebouncedValue];
};
