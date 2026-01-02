import { type ReactNode } from 'react';
import { AuthContext } from './authContext';
import { useMe } from '@/hooks/useAuthenticationHooks';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useMe(); 
  
  return (
    <AuthContext.Provider value={{ ...data, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
