import style from "./Header.module.scss";
import type { DropdownProp, HeaderProps } from "./Header.types";
import Dropdown from "../../molecules/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { ChevronDown, LogOut, MenuIcon } from "lucide-react";
import { SideMenu } from "../SideMenu/SideMenu";
import { useMemo, useState } from "react";
import Button from "@components/atoms/Button/Button";

import clsx from "clsx";
import { userRoutes } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const Header = ({ logout, userDetails }: HeaderProps) => {
  const {t} = useTranslation(["common", "menu"])
  const navigate = useNavigate();
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const remappedRoutes = useMemo(
    () =>
      userRoutes.map(({path, ...rest}) =>
        ({onClick: () => navigate(path, {replace: true}), ...rest})), [navigate])
    
  const userLabel = userDetails && (
    <div className={style["c-header__user-info"]}>
      <span className={style["c-header__username"]}>{userDetails}</span>
      <ChevronDown className={clsx({[style['c-header__chevron-opened']]: dropdownOpened})} size={12} />
    </div>
  );
  
  const menuOptions = [
    ...remappedRoutes,
    {
      key:'logout',
      label: t('common:header.actions.logout'),
      icon: <LogOut size={12} />,
      onClick: logout,
    },
  ] as DropdownProp[];
  
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <header className={style["c-header"]}>
      <div className="l-container">
        <div className={style["c-header__container"]}>
          <div className={style["c-header__left-area"]}>
            <Button 
              color="custom"
              onClick={() => {setMenuOpen(isOpen => !isOpen)}}
              aria-label={t('common:header.actions.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="side-menu"
            >
            <MenuIcon size={36}  />
              </Button>
            <Typography
              variant="h1"
              additionalClasses={style["c-header__style"]}
            >
              {t('common:app.title')}
            </Typography>
          </div>
          
          {userDetails && (
            <Dropdown<DropdownProp>
              label={userLabel} 
              options={menuOptions} 
              className={style["c-header__user-dropdown"]}
              onTriggerClick={setDropdownOpened}
            >
              {(option) => (
                  <Button
                    key={option.key}
                    color="custom"
                  >{option.icon} {t(`menu:${option.label}`)}</Button>
                )}
              </Dropdown>
          )}
        </div>
      </div>
    </header>
    <SideMenu
      isOpen={menuOpen}
      onClose={() =>{setMenuOpen(false)}}
      menuType={userDetails ? 'privateRoutes' : 'publicRoutes'}
    />
    </>
  );
};

export default Header;
