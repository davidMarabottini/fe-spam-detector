import Header from "@components/organisms/Header/Header";
import { Outlet, useMatches, type UIMatch } from 'react-router-dom';
import Typography from "@/components/atoms/Typography/Typography";
import styles from './MainLayout.module.scss';
import { useTranslation } from "react-i18next";
import Card from "@/components/atoms/Card/Card";
import { ToastContainer } from "@/components/organisms/Toast/ToastContainer";
import clsx from "clsx";
import { useMemo } from "react";
import type { RouteHandle } from "@/constants/routes";

export const MainLayout = () => {
  const matches = useMatches() as Array<UIMatch & { handle?: RouteHandle }>;
  const {t} = useTranslation("menu");
  
  const label = useMemo(() => {
    return matches?.at?.(-1)?.handle?.label || '';
  }, [matches]);

  const mainClass = clsx(styles['cl-layout__main'], "l-container l-content-section")

  return (
    <div className="l-main-layout">
      <Header />

      <main className={mainClass}>
        <Card additionalClassName={styles['cl-layout__card-title']}>
          <Typography
            as="h2"
            variant="h2"
            additionalClasses={styles['cl-layout__title']}
          >
           {t(label)}
          </Typography>
        </Card>
        <ToastContainer />
        <Outlet />
      </main>
    </div>
  );
};