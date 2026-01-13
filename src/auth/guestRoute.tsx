import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';

export const GuestRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Caricamento sessione...</div>;

  return !user ? <Outlet /> : <Navigate to="/analyze" replace />;
};
