import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { authTokenStore } from './tokenStore';
import { generateMockJWT } from '../utils/jwt';

export const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!authTokenStore.get());
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      const token = authTokenStore.get();
      setIsAuthenticated(!!token);
    }
    catch(e) {
      authTokenStore.set(null);
      console.error('Error retrieving token:', e);
    }
    finally {
      setIsLoading(false);
    }
  }, [])

  const login = () => {
    const mockToken = generateMockJWT('user-mock', 'admin');

    authTokenStore.set(mockToken);
    setIsAuthenticated(true);
    console.log('JWT Generato:', mockToken);
  };

  const logout = () => {
    authTokenStore.set(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
