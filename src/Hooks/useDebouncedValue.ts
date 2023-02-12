import { useRef, useState } from 'react';

type DebouncedValue = <T>(
  initialState: T | (() => T)
) => [T, (value: T | (() => T)) => void];

export const useDebouncedValue: DebouncedValue = initialState => {
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
    }, 200);
  };

  const setDebouncedValue = (newValue: typeof initialState) => {
    handleChange(newValue, setValue);
  };

  return [value, setDebouncedValue];
};
