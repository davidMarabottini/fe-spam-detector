import style from "./Header.module.scss";
import type { HeaderProps } from "./Header.types";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";

const Header = ({ logout, userDetails }: HeaderProps) => {
  const {t} = useTranslation()

  const userLabel = userDetails ? (
    <div className={style["c-header__user-info"]}>
      <span className={style["c-header__username"]}>{userDetails.user}</span>
    </div>
  ) : null;

  const menuOptions = [
    { label: t('header.actions.logout'), onClick: logout }
  ];

  return (
    <header className={style["c-header"]}>
      <div className="l-container">
        <div className={style["c-header__container"]}>
          <Typography variant="h1" additionalClasses={style["c-header__style"]}>
            {t('app.title')}
          </Typography>
          {userDetails && (
            <Dropdown 
              label={userLabel} 
              options={menuOptions} 
              className={style["c-header__user-dropdown"]} 
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
