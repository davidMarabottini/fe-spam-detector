import Header from "@components/organisms/Header/Header";
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
     <div className="l-main-layout">
      <Header />
      <main className="l-container l-content-section">
        <Outlet />
      </main>
    </div>
  );
};