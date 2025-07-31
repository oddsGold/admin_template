export interface GeneralResponse<TData, TMeta = unknown> {
    data: TData[];
    meta?: TMeta;
}

export interface EntityWithId {
    id: number;
}