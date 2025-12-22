import Header from "@/components/organisms/Header/Header";
import { useAuth } from "../auth/useAuth";
import { Outlet } from 'react-router-dom';
import { useLogout } from "@/hooks/useAuthenticationHooks";


export const PrivateLayout = () => {
  const {mutate: logout} = useLogout();

  const { user } = useAuth();

  return (
    <div className="l-main-layout">
      <Header logout={logout} userDetails={user as {user: string, role: 'admin'}}/>
      <main className="l-container l-content-section">
        <Outlet />
      </main>
    </div>
  );
};