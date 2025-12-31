import style from "./Header.module.scss";
import type { HeaderProps } from "./Header.types";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { ChevronDown, MenuIcon } from "lucide-react";
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import clsx from "clsx";

const Header = ({ logout, userDetails }: HeaderProps) => {
  const {t} = useTranslation()
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const userLabel = userDetails && (
    <div className={style["c-header__user-info"]}>
      <span className={style["c-header__username"]}>{userDetails}</span>
      <ChevronDown className={clsx({[style['c-header__chevron-opened']]: dropdownOpened})} size={12} />
    </div>
  );

  const menuOptions = [
    { label: t('header.actions.logout'), onClick: logout }
  ];

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <header className={style["c-header"]}>
      <div className="l-container">
        <div className={style["c-header__container"]}>
          <div className={style["c-header__left-area"]}>
            <Button color="custom" onClick={() => {setMenuOpen(isOpen => !isOpen)}}>
            <MenuIcon size={36}  />
              </Button>
            <Typography
              variant="h1"
              additionalClasses={style["c-header__style"]}
            >
              {t('app.title')}
            </Typography>
          </div>
          
          {userDetails && (
            <Dropdown 
              label={userLabel} 
              options={menuOptions} 
              className={style["c-header__user-dropdown"]}
              onTriggerClick={setDropdownOpened}
            />
          )}
        </div>
      </div>
    </header>
    <SideMenu isOpen={menuOpen} onClose={() =>{setMenuOpen(false)}} menuType={userDetails ? 'privateRoutes' : 'publicRoutes'} />
    </>
  );
};

export default Header;
