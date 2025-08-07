import { EntityWithId } from '../../types/api';

interface MetaPagination {
  total: number;
  current_page: number;
  per_page: number;
}

interface DataPaginationProps<TData extends EntityWithId> {
  data: TData[];
  meta?: MetaPagination;
  onlyTo?: boolean;
}

function PaginationInfo<TData extends EntityWithId>({
  data,
  meta,
  onlyTo = false,
}: DataPaginationProps<TData>) {
  if (!data?.length || !meta?.total) return null;

  const from = (meta.current_page - 1) * meta.per_page + 1;
  const to = from + data.length - 1;

  return (
    <div className="pb-3 xl:pb-0">
      <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
        {onlyTo
          ? `Showing ${to} of ${meta.total} entries`
          : `Showing ${from} to ${to} of ${meta.total} entries`}
      </p>
    </div>
  );
}

export default PaginationInfo;
