import {PaginationLinks, PaginationMeta} from "./api";
import {Role} from "./role";

export interface User {
    id: number;
    login: string;
    email: string;
    tfa: boolean;
    last_login_at: string;
    role: Role;
    created_at: string;
    updated_at: string;
}

export interface UsersResponse {
    data: User[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface UserRequest {
    id?: string;
    email: string;
    login: string;
    password: string;
    password_confirmation: string;
    role: string;
    tfa: number;
}

export type EmailRequest = {
    email: string;
}

export type PasswordRequest = {
    old_password: string;
    password: string;
    password_confirmation: string;
}