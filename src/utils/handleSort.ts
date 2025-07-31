export const handleSort = (
    column: string,
    sort: string,
    setSort: (sort: string) => void
) => {
    if (typeof setSort === 'function') {
        const isAsc = sort === column;
        setSort(isAsc ? `-${column}` : column);
    }
};