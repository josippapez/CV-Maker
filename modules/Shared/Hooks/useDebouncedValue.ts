import { useDebouncedFunction } from '@modules/Shared/Hooks/useDebouncedFunction';
import { useState } from 'react';

type DebouncedValue = <T>(
  initialState: T | (() => T),
  customTimeout?: number
) => [
  T,
  (value: T | (() => T)) => void,
  React.Dispatch<React.SetStateAction<T>>
];

export const useDebouncedValue: DebouncedValue = (
  initialState,
  customTimeout = 300
) => {
  const [value, setValue] = useState(initialState);

  const [setDebouncedValue] = useDebouncedFunction(
    (newValue: typeof initialState) => {
      setValue(newValue);
    },
    customTimeout
  );

  return [value, setDebouncedValue, setValue];
};
