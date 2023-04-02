
import { RefObject, useEffect } from 'react';

export const useCloseOnClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};
