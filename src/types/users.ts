export interface User {
    id: number;
    login: string;
    email: string;
    tfa: boolean;
    last_login_at: string;
    role: {
        id: number;
        name: string;
        label: string;
        resources: number[];
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
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

export interface UsersResponse {
    data: User[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface UsersQueryParams {
    page?: number;
    limit?: number;
    sort?: string;
    status?: string[];
}

export interface PayloadRequest {
    id: number;
    created_at: string;
    published: boolean;
    published_at: string | null | "";
    published_to: string | null | "";
    title: string;
    updated_at: string;
    user: string;
}

export interface UpdatePositionRequest {
    sequence: PayloadRequest[];
}

export interface UserRequest {
    email: string;
    login: string;
    password: string;
    password_confirmation: string;
    role: string;
    tfa: boolean;
}