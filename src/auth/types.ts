export type UserProfile = string;

export interface AuthContextType {
  user?: string;
  id?: number;
  role?: ('user' | 'admin')[]
  isAuthenticated?: boolean;
  isLoading: boolean;
}

export type decodedToken = {
  user: string;
  role: 'admin';
  created: string;
  exp: number;
  iat: number
}