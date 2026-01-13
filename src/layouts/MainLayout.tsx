import Header from "@components/organisms/Header/Header";
import { useAuth } from "../auth/useAuth";
import { Outlet, useMatches } from 'react-router-dom';
import { useLogout } from "@/hooks/api/useAuthenticationHooks";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './MainLayout.module.scss';
import { useTranslation } from "react-i18next";
import Card from "@/components/atoms/Card/Card";
import { ToastContainer } from "@/components/organisms/Toast/ToastContainer";
import clsx from "clsx";
import { useMemo } from "react";

export const MainLayout = () => {
  const matches = useMatches();
  const {mutate: logout} = useLogout();
  const {t} = useTranslation("menu");

  const { user } = useAuth();
  
  const label = useMemo(() => {
  return matches?.at?.(-1)?.handle?.label || '';
}, [matches]);

  return (
    <div className="l-main-layout">
      <Header logout={user ? logout : undefined} userDetails={user || null}/>
      <main className={clsx(styles['cl-layout__main'], "l-container l-content-section")}>
        <Card additionalClassName={styles['cl-layout__card-title']}>
          <Typography as="h2" variant="h2" additionalClasses={styles['cl-layout__title']}>
           {t(label)}
          </Typography>
        </Card>
        <ToastContainer  />
        <Outlet />
      </main>
    </div>
  );
};