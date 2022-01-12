import { UserRole } from 'enums/userRole.enum';

export type User = {
  id: string;
  email: string;
  fullname: string;
  birthday: string | null;
  phone: string | null;
  role: UserRole;
  language: string;
  currency: string;
  password?: string;
  favorites?: string[];
};
