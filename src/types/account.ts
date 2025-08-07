import { Role } from './role';

export interface AccountData {
  id: number;
  login: string;
  email: string;
  tfa: boolean;
  last_login_at: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  data: AccountData;
}
