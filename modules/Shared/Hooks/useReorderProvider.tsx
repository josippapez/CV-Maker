import { Operations } from '@/store/reducers/pdfData';
import { useReorder } from '@modules/Shared/Hooks';
import { Reorder } from 'framer-motion';
import { PropsWithChildren, createContext, useEffect, useMemo } from 'react';

interface ReorderContextProps<T> {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  setReorderList: React.Dispatch<React.SetStateAction<T[]>>;
  reorderList: T[];
  reOrder: (newOrder: T[]) => void;
  stopReorder: () => void;
}

interface Props<T> {
  items: T[];
  setFunction: (
    operation: Operations,
    data?: Partial<T> | Partial<T>[],
    index?: number
  ) => void;
}

export const ReorderContext = createContext<ReorderContextProps<any>>({
  isDragging: false,
  setIsDragging: () => {
    return;
  },
  setReorderList: () => {
    return;
  },
  reorderList: [],
  reOrder: () => {
    return;
  },
  stopReorder: () => {
    return;
  },
});

export const ReorderProvider = <T,>({
  children,
  reorderContextValue,
}: {
  children: PropsWithChildren<React.ReactNode>;
  reorderContextValue: ReorderContextProps<T>;
}) => {
  return (
    <ReorderContext.Provider value={reorderContextValue} key={'provider'}>
      <Reorder.Group
        axis='y'
        values={reorderContextValue.reorderList}
        onReorder={(newOrder: T[]) => {
          reorderContextValue.setReorderList(newOrder);
          reorderContextValue.reOrder(newOrder);
        }}
      >
        {children}
      </Reorder.Group>
    </ReorderContext.Provider>
  );
};

export const useReorderProvider = <T,>({ items, setFunction }: Props<T>) => {
  const {
    isDragging,
    setIsDragging,
    setReorderList,
    reorderList,
    reOrder,
    stopReorder,
  } = useReorder(items, setFunction);

  const reorderContextValue = useMemo(
    () => ({
      isDragging,
      setIsDragging,
      setReorderList,
      reorderList,
      reOrder,
      stopReorder,
    }),
    [reorderList, isDragging]
  );

  useEffect(() => {
    setReorderList(items);
  }, [items]);

  return { ...reorderContextValue };
};
