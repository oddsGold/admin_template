import { Location } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DataTableRow from './DataTableRow';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { EntityWithId } from '../../types/api';
import { GridHeader } from '../../types/grid-header';
import { handleSort } from '../../utils/handleSort';
import { useCallback } from 'react';
import { useDragAndDropUpdate } from '../../hooks/useDragAndDropUpdate';
import { useUpdateItemPosition } from '../../queries/general';

interface DataTableProps<TData extends EntityWithId> {
  data: TData[];
  gridHeaderRow: GridHeader[];
  handleDelete?: (item: TData) => void;
  setEditPath?: string;
  location: Location;
  sort: string;
  setSort: (sort: string) => void;
  dnd?: boolean;
}

function DataTable<TData extends EntityWithId>({
  data,
  gridHeaderRow,
  handleDelete,
  setEditPath,
  location,
  sort,
  setSort,
  dnd,
}: DataTableProps<TData>) {
  const { mutateAsync: updatePositionAsync } = useUpdateItemPosition();

  const updatePositionToApi = useCallback(
    async (newData: TData[]) => {
      const payload = { sequence: newData };
      await updatePositionAsync(payload);
    },
    [updatePositionAsync]
  );

  const getNewData = useCallback(
    (currentData: TData[], activeId: string | number, overId: string | number) => {
      const activeIndex = currentData.findIndex((item) => item.id === activeId);
      const overIndex = currentData.findIndex((item) => item.id === overId);

      const newData = [...currentData];
      const [removed] = newData.splice(activeIndex, 1);
      newData.splice(overIndex, 0, removed);
      return newData;
    },
    []
  );

  const { localData, handleDragStart, handleDragEnd } = useDragAndDropUpdate<TData>({
    data,
    updatePositionToApi,
  });

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      handleDragEnd(
        {
          active: { id: Number(active.id) },
          over: { id: Number(over.id) },
        },
        getNewData
      );
    },
    [handleDragEnd, getNewData]
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <Table className="w-full overflow-hidden">
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            {gridHeaderRow.map((header, index) => (
              <TableCell
                key={index}
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs border border-gray-100 dark:text-gray-400 dark:border-white/[0.05]"
              >
                <div className="flex items-center justify-between cursor-pointer">
                  <b>{header.label}</b>
                  {header.sortable && (
                    <button
                      className="flex flex-col gap-0.5"
                      onClick={() => header.sortable && handleSort(header.name, sort, setSort)}
                    >
                      <svg
                        className="text-gray-300 dark:text-gray-700  text-brand-500"
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        fill="none"
                      >
                        <path
                          d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <svg
                        className="text-gray-300 dark:text-gray-700  "
                        width="8"
                        height="5"
                        viewBox="0 0 8 5"
                        fill="none"
                      >
                        <path
                          d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              </TableCell>
            ))}
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs border border-gray-100 dark:text-gray-400 dark:border-white/[0.05]"
            >
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          <SortableContext
            items={localData.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {(dnd ? localData : data).map((row) => (
              <DataTableRow
                key={row.id}
                id={row.id}
                gridHeaderRow={gridHeaderRow}
                row={row}
                setEditPath={setEditPath}
                handleDelete={handleDelete}
                location={location}
                dnd={dnd}
              />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}

export default DataTable;
