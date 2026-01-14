import style from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import Typography from "@/components/atoms/Typography/Typography";
import { MenuIcon } from "lucide-react";
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import Button from "@components/atoms/Button/Button";

import { useAuth } from "@/auth/useAuth";
import UserMenu from "../UserMenu/UserMenu";


const Header = () => {
  const {t} = useTranslation(["common", "menu"])
  const {isAuthenticated} = useAuth();
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
            
            {isAuthenticated && (
              <UserMenu />
            )}
          </div>
        </div>
      </header>

      <SideMenu
        isOpen={menuOpen}
        onClose={() =>{setMenuOpen(false)}}
      />
    </>
  );
};

export default Header;
