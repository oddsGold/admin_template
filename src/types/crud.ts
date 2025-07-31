import {GridHeader} from "./grid-header";
import {EntityWithId} from "./api";

export interface MultiOption {
    value: string;
    label: string;
    selected: boolean;
}

export interface QueryParams {
    page: number;
    limit: number;
    sort: string;
    filters?: {
        multiOptions?: MultiOption[];
    };
}

export interface BasicTableProps<TData extends EntityWithId, TMeta> {
    setEditPath?: string;
    gridHeaderRow: GridHeader[];
    data: TData[];
    handleDelete?: (item: TData) => void;
    sort: string;
    setSort: (sort: string) => void;
    setPage: (page: number) => void;
    page: number;
    size: number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    search?: boolean;
    meta?: TMeta;
    isFilter?: boolean;
    setFilters: (filters: Record<string, unknown>) => void;
    isLoading?: boolean;
    dnd?: boolean;
}