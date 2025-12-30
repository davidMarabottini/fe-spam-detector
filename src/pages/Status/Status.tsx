import Card from "@/components/atoms/Card/Card"
import clsx from "clsx"
import styles from './Status.module.scss'
import ResultCircle from "@/components/atoms/ResultCircle/ResultCircle"
import Button from "@/components/atoms/Button/Button"
import { Mail, Smartphone } from 'lucide-react';
import BadgeContainer from "./components/BadgeContainer/BadgeContainer"
import HamSpamTable from "./components/HamSpamTable/HamSpamTable"
import { useUserStatus } from "@/hooks/useUserHooks"
import { useTranslation } from "react-i18next"

const Status = () => {
  const {data, isLoading, isError} = useUserStatus();
  
  const {t} = useTranslation('status');
  

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError || !data) {
    return <div>Error</div>
  }

  const {contributions, user, badges, privileges} = data;

  return (
    <div className={clsx(styles["p-status"], "l-grid")}>
      <div className={clsx(styles["p-status__title"], "l-grid__col l-grid__col--span-12")}><h2>{t("title")}</h2></div>
      <Card additionalClassName={clsx(styles["p-status__contributions-card"], "l-grid__col l-grid__col--span-4")}>
        <h3 className={styles["p-status__subtitle"]}>
          {t("contribution.title")}
        </h3>
        <HamSpamTable ham={contributions.mail.ham} spam={contributions.mail.spam}>
          <div>
            <Mail size={16} /> {t("contribution.areas.mail")}
          </div>
        </HamSpamTable>
        <HamSpamTable ham={contributions.sms.ham} spam={contributions.sms.spam}>
          <div>
            <Smartphone size={16} /> {t("contribution.areas.sms")}
          </div>
        </HamSpamTable>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__progress-card'],"l-grid__col l-grid__col--span-4")}>
        <h3 className={styles["p-status__subtitle"]}>{t('progress.level', {level: user.level})}</h3>
        <strong>
          {t("progress.title")}
        </strong>
        <ResultCircle percentage={user.nextLevelProgress} />
        <p>{user.rank}</p>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__badges-card'], "l-grid__col l-grid__col--span-4")}>
        <h3 className={styles["p-status__subtitle"]}>{t('badges.title')}</h3>
        <div className="l-grid">
          {
            badges.map(({id, name}) => (
              <div key={id} className="l-grid__col l-grid__col--3">
                <BadgeContainer badgeName={name} />
              </div>
            ))
          }
        </div>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__priviledges-card'], "l-grid__col l-grid__col--span-12")}>
        <strong>{t('privileges.title')}</strong>
        <div className={styles['p-status__internal-priviledges-card']}>
          {privileges.map((x) => (
            <div key={x} className={styles['p-status__priviledge']}>
              <p>{x}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card additionalClassName={clsx(styles['p-status__buttons-card'], "l-grid__col l-grid__col--span-12")}>
        <Button>{t('buttons.newMessage')}</Button>
        <Button>{t('buttons.cronology')}</Button>
      </Card>
    </div>
  )
}

export default Status
