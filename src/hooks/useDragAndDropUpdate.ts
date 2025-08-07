import { useRef, useCallback, useEffect, useState } from 'react';
import { EntityWithId } from '../types/api';

interface UseDragAndDropUpdateProps<TData extends EntityWithId> {
  data: TData[];
  updatePositionToApi: (newData: TData[]) => Promise<void>;
}

export const useDragAndDropUpdate = <TData extends EntityWithId>({
  data,
  updatePositionToApi,
}: UseDragAndDropUpdateProps<TData>) => {
  const [localData, setLocalData] = useState<TData[]>(data);
  const [previousData, setPreviousData] = useState<TData[]>(data);
  const timeoutRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    setLocalData(data);
    setPreviousData(data);
  }, [data]);

  const updateApi = useCallback(
    async (newData: TData[]) => {
      try {
        // setPreviousData(localData);
        await updatePositionToApi(newData);
      } catch (err) {
        console.error(err);
        setLocalData(previousData);
        throw err;
      }
    },
    [updatePositionToApi, previousData]
  );

  const sendUpdateIfNotDragging = useCallback(
    (newData: TData[]) => {
      if (!isDraggingRef.current) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          if (!isDraggingRef.current) {
            updateApi(newData);
          }
        }, 2000);
      }
    },
    [updateApi]
  );

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleDragEnd = useCallback(
    (
      event: { active: { id: number }; over: { id: number } | null },
      getNewData: (currentData: TData[], activeId: number, overId: number) => TData[]
    ) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        isDraggingRef.current = false;
        return;
      }

      const newData = getNewData(localData, active.id, over.id);
      setLocalData(newData);
      isDraggingRef.current = false;
      sendUpdateIfNotDragging(newData);
    },
    [localData, sendUpdateIfNotDragging]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    localData,
    handleDragStart,
    handleDragEnd,
  };
};
