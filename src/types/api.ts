export interface GeneralResponse<TData, TMeta = unknown> {
    data: TData[];
    meta?: TMeta;
}

export interface EntityWithId {
    id: number;
}

export interface QueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    status?: string[];
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface MultiOption {
    value: string;
}