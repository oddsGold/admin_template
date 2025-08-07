import { PaginationLinks, PaginationMeta } from './api.ts';
export interface Images {
  id: number;
  name: string;
  origin: string;
  path: string;
  size: number;
  type: string;
  user: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Files {
  id: number;
  name: string;
  origin: string;
  path: string;
  size: number;
  type: string;
  user: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ImagesResponse {
  data: Images[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface FileResponse {
  data: Files[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
