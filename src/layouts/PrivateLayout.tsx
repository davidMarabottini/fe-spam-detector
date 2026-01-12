import Header from "@components/organisms/Header/Header";
import { useAuth } from "../auth/useAuth";
import { Outlet, useMatches } from 'react-router-dom';
import { useLogout } from "@/hooks/api/useAuthenticationHooks";
import Typography from "@/components/atoms/Typography/Typography";
import styles from './layouts.module.scss';
import { useTranslation } from "react-i18next";
import Card from "@/components/atoms/Card/Card";
import { ToastContainer } from "@/components/organisms/Toast/ToastContainer";
import clsx from "clsx";

export const PrivateLayout = () => {
  const matches = useMatches();
  const {mutate: logout} = useLogout();
  const {t} = useTranslation("menu");

  const { user } = useAuth();
  
  const label = matches?.at?.(-1)?.handle?.label || '';

  return (
    <div className="l-main-layout">
      <Header logout={logout} userDetails={user}/>
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