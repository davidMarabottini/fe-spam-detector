export interface UserProfile {
  user: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: UserProfile | null;
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