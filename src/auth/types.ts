export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: unknown;
  token?: string | null;
  login: () => void;
  logout: () => void;
}

export type decodedToken = {
  user: string;
  role: 'admin';
  created: string;
  exp: number;
  iat: number
}