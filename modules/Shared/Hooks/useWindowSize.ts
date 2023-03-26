import { useDebouncedValue } from '@modules/Shared/Hooks/useDebouncedValue';
import { useEffect } from 'react';

export const useWindowSize = (threshold = 100) => {
  const [debouncedWindowSize, setDebouncedWindowSize] = useDebouncedValue({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const newWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (
        Math.abs(debouncedWindowSize.width - newWindowSize.width) > threshold ||
        Math.abs(debouncedWindowSize.height - newWindowSize.height) > threshold
      ) {
        setDebouncedWindowSize(newWindowSize);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return debouncedWindowSize;
};
