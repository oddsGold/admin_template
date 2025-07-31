interface MetaPagination {
    last_page: number;
}

interface PagePaginationProps {
    page: number;
    setPage: (page: number) => void;
    meta?: MetaPagination;
}

const PagePagination = ({ page, setPage, meta }: PagePaginationProps) => {
    if (!meta) return null;

    return (
        <div className="flex items-center justify-center">
            <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 text-sm disabled:opacity-50"
            >
                Previous
            </button>

            <div className="flex items-center gap-2">
                {Array.from({ length: meta.last_page || 1 }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`flex w-10 h-10 items-center justify-center rounded-lg text-sm font-medium ${
                            page === i + 1
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-700 hover:text-brand-500 hover:bg-blue-100'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <button
                disabled={page >= (meta.last_page || 1)}
                onClick={() => setPage(page + 1)}
                className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 text-sm disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default PagePagination;
