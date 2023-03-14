import { Operations } from '@/store/reducers/pdfData';
import { useDebouncedFunction } from '@modules/Shared/Hooks/useDebouncedFunction';
import { useState } from 'react';

export const useReorder = <T>(
  initialArray: T[],
  setFunction: (
    operation: Operations,
    data?: Partial<T> | Partial<T>[],
    index?: number
  ) => void
) => {
  const [reorderList, setReorderList] = useState(initialArray);
  const [isDragging, setIsDragging] = useState(false);

  const [reOrder, clear] = useDebouncedFunction((newOrder: T[]) => {
    setFunction(Operations.SET, newOrder);
  }, 3000);

  return {
    reorderList,
    setReorderList,
    isDragging,
    setIsDragging,
    reOrder,
    stopReorder: clear,
  };
};
