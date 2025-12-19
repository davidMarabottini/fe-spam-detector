import { authTokenStore } from "../auth/tokenStore";
import { useAuth } from "../auth/useAuth";
import Header from "@components/organisms/Header/Header";
import { Outlet } from 'react-router-dom';
import { getDecodedToken } from "../utils/jwt";


export const PrivateLayout = () => {
  const { logout } = useAuth();
  const token = authTokenStore.get();
  const { user, role } = getDecodedToken(token)!;

  return (
    <div className="l-main-layout">
      <Header logout={logout} userDetails={{user, role}}/>
      <main className="l-container l-content-section">
        <Outlet />
      </main>
    </div>
  );
};