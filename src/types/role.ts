import { PaginationLinks, PaginationMeta } from './api';

export interface Role {
  id: number;
  name: string;
  label: string;
  resources: number[];
  created_at: string;
  updated_at: string;
}

export interface RolesResponse {
  data: Role[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface RoleRequest {
  label: string;
  resources: number[];
}

export interface Resources {
  id: number;
  name: string;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface ResourcesResponse {
  data: Resources[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
