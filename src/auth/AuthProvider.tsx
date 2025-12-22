import { type ReactNode } from 'react';
import { AuthContext } from './authContext';
import { useMe } from '@/hooks/useAuthenticationHooks';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useMe(); 
  
  const user = data?.user ?? null;

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
