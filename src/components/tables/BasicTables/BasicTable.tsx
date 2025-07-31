import {useLocation} from 'react-router-dom';
import {useModal} from '../../../hooks/useModal';
import {EntityWithId} from '../../../types/api';
import {PaginationMeta} from '../../../types/users';
import {BasicTableProps, MultiOption} from "../../../types/crud";
import DataTable from "../DataTable.tsx";
import PaginationInfo from "../../generics/PaginationInfo";
import PagePagination from "../../generics/PagePagination";
import SearchInput from "../../generics/SeatchInput";
import PaginationSelector from "../../generics/PaginationSelector";
import Filter from "../../form/Filter";
import {useFilters} from "../../../hooks/useFilters";
import FilterButton from "../../ui/button/FilterButton";
import FilterModal from "../../ui/modal/FilterModal";
import ClearFilter from "../../form/ClearFilter";


const multiOptions: MultiOption[] = [
    {value: '1', label: 'Option 1', selected: false},
    {value: '2', label: 'Option 2', selected: false},
    {value: '3', label: 'Option 3', selected: false},
    {value: '4', label: 'Option 4', selected: false},
    {value: '5', label: 'Option 5', selected: false},
];

export default function BasicTable<
    TData extends EntityWithId,
    TMeta extends PaginationMeta = PaginationMeta>
({
     gridHeaderRow,
     data,
     setEditPath,
     handleDelete,
     sort = '',
     setSort,
     setPage,
     page,
     size,
     handleChange,
     search,
     meta,
     isFilter,
     setFilters,
     isLoading,
     dnd,
 }: BasicTableProps<TData, TMeta>) {
    const location = useLocation();
    const {isOpen, openModal, closeModal} = useModal();

    const {
        selectedStatuses,
        removeFilter,
        setSelectedStatuses,
        clearFilters
    } = useFilters({
        initialFilters: { selectedValues: [], selectedOptions: [] },
        setFilters,
        setPage,
    });


    const hasActiveFilters = selectedStatuses.selectedOptions.length > 0;

    const closeModalWithReset = () => {
        closeModal();
    };

    const renderSelectedFilters = () => {
        return selectedStatuses.selectedOptions.map((status) => (
            <FilterButton key={status.value} status={status} removeFilter={removeFilter}/>
        ));
    };

    const handleSubmit = () => {
        setFilters({status: selectedStatuses.selectedValues});
        setPage(1);
        closeModal();
    };

    return (
        <>
            <div
                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    {isFilter && (
                        <div
                            className="flex flex-col gap-2 px-4 py-4 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-end">
                            <div className="flex gap-2">
                                {hasActiveFilters && renderSelectedFilters()}
                                {selectedStatuses.selectedOptions.length > 0 && <ClearFilter clearFilters={clearFilters}/>}
                                <Filter openModal={openModal}/>
                            </div>
                        </div>
                    )}

                    <div
                        className={`flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] sm:flex-row sm:items-center sm:justify-between ${!isFilter ? 'rounded-t-xl' : ''}`}
                    >
                        <PaginationSelector size={size} handleChange={handleChange}/>
                        {search && <SearchInput/>}
                    </div>

                    <DataTable
                        data={data}
                        gridHeaderRow={gridHeaderRow}
                        handleDelete={handleDelete}
                        setEditPath={setEditPath}
                        location={location}
                        sort={sort}
                        setSort={setSort}
                        dnd={dnd}
                    />

                    <div
                        className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                            <PaginationInfo data={data} meta={meta}/>
                            <PagePagination page={page} setPage={setPage} meta={meta}/>
                        </div>
                    </div>
                </div>
            </div>

            <FilterModal
                isOpen={isOpen}
                closeModal={closeModalWithReset}
                multiOptions={multiOptions}
                selectedStatuses={selectedStatuses}
                setSelectedStatuses={setSelectedStatuses}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </>
    );
}