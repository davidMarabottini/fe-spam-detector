import { type ReactNode } from 'react';
import { AuthContext } from './authContext';
import { useMe } from '@/hooks/api/useAuthenticationHooks';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, isError } = useMe(); 

  const value = {
    user: data?.user,
    isAuthenticated: !!data && !isError,
    isLoading,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
