import React from 'react';
import { useEffect, useState } from 'react';
import { QueryParams } from '../types/crud';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { EntityWithId, GeneralResponse, PaginationMeta } from '../types/api';

export function UseCrudPageLogic<
  TData extends EntityWithId,
  TMeta extends PaginationMeta = PaginationMeta,
>(
  useQuery: (params: QueryParams) => UseQueryResult<GeneralResponse<TData, TMeta>, Error>,
  deleteMutation?: () => UseMutationResult<void, Error, number, unknown>,
  initialLimit = 30
) {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [size, setSize] = useState<number>(30);
  const [sort, setSort] = useState<string>('-id');
  const [items, setItems] = useState<TData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<TData | null>(null);
  const [filters, setFilters] = useState<{ status?: string[] }>(() => {
    if (typeof window !== 'undefined') {
      const savedFilters = localStorage.getItem('selectedFilters');
      if (savedFilters) {
        const parsedFilters = JSON.parse(savedFilters);
        if (parsedFilters.selectedValues && parsedFilters.selectedValues.length > 0) {
          return { status: parsedFilters.selectedValues };
        }
      }
    }
    return {};
  });

  /**
   * Параметри запиту для отримання списку
   * @type {QueryParams}
   * @example
   * // Приклад відправки параметрів:
   * {
   *   page: 1,       // Перша сторінка
   *   limit: 30,     // 30 елементів на сторінці
   *   sort: '-id',   // Сортування за ID у зворотному порядку
   *   status: ["1", "2", "3", "4"]// Фільтр (values)
   * }
   */
  const queryParams: QueryParams = {
    page,
    limit,
    sort,
    ...(filters || {}),
  };

  const {
    data: response,
    isLoading: isQueryLoading,
    isPending: isQueryPending,
    isFetching,
    isError,
    error,
    ...rest
  } = useQuery(queryParams);

  const useDeleteMutation = deleteMutation?.();
  const { isPending: isDeletePending } = useDeleteMutation || {};

  const data = response?.data || [];
  const meta = response?.meta;

  const isLoading = isQueryLoading || isDeletePending;
  const isPending = isQueryPending || isDeletePending;

  useEffect(() => {
    if (page === 1) {
      setItems(data || []);
    } else if (data?.length > 0) {
      setItems((prev) => [...prev, ...data]);
    }

    if (meta?.total && items.length + data.length >= meta.total) {
      setHasMore(false);
    }

    setIsFetchingMore(false);
  }, [response]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setIsFetchingMore(true);
      setPage(page + 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setSize(Number(event.target.value));
    setPage(1);
  };

  const handleOpenDialog = (item: TData) => {
    setItemToDelete(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDelete(null);
  };

  const handleDelete = () => {
    if (itemToDelete && useDeleteMutation && typeof useDeleteMutation.mutate === 'function') {
      useDeleteMutation.mutate(itemToDelete.id);
    } else {
      console.error('Delete mutation is not initialized or does not have mutate function.');
    }
    handleCloseDialog();
  };

  return {
    data,
    meta,
    items,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    page,
    limit,
    size,
    setPage,
    handleChange,
    sort,
    setSort,
    loadMore,
    setLimit,
    hasMore,
    isFetchingMore,
    filters,
    setFilters,
    openDialog,
    itemToDelete,
    handleOpenDialog,
    handleCloseDialog,
    handleDelete,
    ...rest,
  };
}
