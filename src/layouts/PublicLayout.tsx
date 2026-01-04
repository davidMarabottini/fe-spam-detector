import Typography from "@components/atoms/Typography/Typography";
import Header from "@components/organisms/Header/Header";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches } from 'react-router-dom';
import styles from './layouts.module.scss';
import Card from "@components/atoms/Card/Card";

export const PublicLayout = () => {
  const matches = useMatches();
  const {t} = useTranslation("menu");

  const label = matches?.at?.(-1)?.handle?.label || '';
  
  return (
     <div className="l-main-layout">
      <Header />
      <main className="l-container l-content-section">
        <Card additionalClassName={styles['cl-layout__card-title']}>
          <Typography as="h2" variant="h2" additionalClasses={styles['cl-layout__title']}>
            {t(label)}
          </Typography>
        </Card>

        <Outlet />
      </main>
    </div>
  );
};