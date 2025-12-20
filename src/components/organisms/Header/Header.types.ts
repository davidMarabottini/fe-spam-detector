import type { decodedToken } from "../../../auth/types";

export interface HeaderProps {
  logout?: () => void;
  userDetails?: Pick<decodedToken, 'user' | 'role'>;
};