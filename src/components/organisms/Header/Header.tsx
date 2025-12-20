import style from "./Header.module.scss";
import type { HeaderProps } from "./Header.types";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";

const Header = ({ logout, userDetails }: HeaderProps) => {
  const {t} = useTranslation()

  const userLabel = userDetails ? (
    <div className={style["c-header__user-info"]}>
      <span className={style["c-header__username"]}>{userDetails.user}</span>
      <span className={style["c-header__role"]}>{userDetails.role}</span>
    </div>
  ) : null;

  const menuOptions = [
    { label: "Logout", onClick: logout }
  ];

  return (
    <header className={style["c-header"]}>
      <div className="l-container">
        <div className={style["c-header__container"]}>
          <h1 className={style["c-header__title"]}>{t('title')}</h1> {/**Spam Detector AI */}
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
