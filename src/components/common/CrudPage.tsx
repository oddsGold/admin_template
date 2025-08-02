import BasicTable from '../tables/BasicTables/BasicTable';
import {Loading} from '../loadingBar/Loading';
import DeleteConfirmDialog from '../generics/DeleteConfirmDialog';
import {GridHeader} from "../../types/grid-header";
import {UseMutationResult, UseQueryResult} from "@tanstack/react-query";
import {DropdownItem} from "../ui/dropdown/DropdownItem";
import {UseCrudPageLogic} from "../../hooks/useCrudPageLogic";
import {EntityWithId, GeneralResponse} from "../../types/api";
import {QueryParams} from "../../types/crud";
import {PaginationMeta} from "../../types/users";

interface CrudPageProps<TData, TMeta = unknown> {
    buttonTitle?: string;
    createPath?: string;
    editPath?: string;
    gridHeaderRow?: GridHeader[];
    useQuery: (params: QueryParams) => UseQueryResult<GeneralResponse<TData, TMeta>, Error>;
    useDeleteMutation?: () => UseMutationResult<void, Error, number, unknown>;
    isFilter?: boolean;
    isSearch?: boolean;
    dnd?: boolean;
}

export default function CrudPage<TData extends EntityWithId, TMeta extends PaginationMeta = PaginationMeta>({
                                                                                                                buttonTitle,
                                                                                                                createPath,
                                                                                                                editPath,
                                                                                                                gridHeaderRow = [],
                                                                                                                useQuery,
                                                                                                                useDeleteMutation,
                                                                                                                isFilter = false,
                                                                                                                isSearch = false,
                                                                                                                dnd = false,
                                                                                                            }: CrudPageProps<TData, TMeta>) {


    const {
        data,
        size,
        page,
        sort,
        setSort,
        setPage,
        meta,
        handleChange,
        setFilters,
        isLoading,
        isPending,
        openDialog,
        itemToDelete,
        handleOpenDialog,
        handleCloseDialog,
        handleDelete,
    } = UseCrudPageLogic<TData, TMeta>(useQuery, useDeleteMutation);


    if (isLoading || isPending) {
        return (
            <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                <Loading/>
            </div>
        );
    }

    const isEmptyData =
        !data ||
        (Array.isArray(data) && data.length === 0) ||
        (typeof data === 'object' && Object.keys(data).length === 0);

    return (
        <>
            {isEmptyData ? (
                <div className="text-lg font-medium text-gray-800 dark:text-white/90">Data not found</div>
            ) : (
                <>
                    {createPath && (
                        <DropdownItem
                            tag="a"
                            to={`${createPath}`}
                            state={{from: location}}
                            baseClassName="inline-flex"
                            className="flex items-center bg-brand-500 text-white shadow-theme-xs disabled:bg-brand-300 gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm dark:hover:text-gray-300"
                        >
                            {buttonTitle ? `Create ${buttonTitle}` : 'Create Item'}
                        </DropdownItem>
                    )}

                    <BasicTable
                        setEditPath={editPath}
                        gridHeaderRow={gridHeaderRow}
                        data={data}
                        handleDelete={handleOpenDialog}
                        sort={sort}
                        setSort={setSort}
                        setPage={setPage}
                        page={page}
                        size={size}
                        handleChange={handleChange}
                        search={isSearch}
                        meta={meta}
                        isFilter={isFilter}
                        setFilters={setFilters}
                        isLoading={isLoading}
                        dnd={dnd}
                    />

                    <DeleteConfirmDialog
                        openDialog={openDialog}
                        title={buttonTitle}
                        handleDelete={handleDelete}
                        handleCloseDialog={handleCloseDialog}
                        itemToDelete={itemToDelete}
                    />
                </>
            )}
        </>
    );
}
