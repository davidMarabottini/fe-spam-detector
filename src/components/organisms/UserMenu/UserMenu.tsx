import clsx from "clsx";
import { structuredMenu } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/api/useAuthenticationHooks";
import { useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import type { DropdownProp } from "../Header/Header.types";
import Dropdown from "@/components/molecules/Dropdown/Dropdown";
import style from "./UserMenu.module.scss";
import { AUTH_DOMAINS } from "@/constants/configuration";
import LinkComponent from "@/components/atoms/LinkComponent/LinkComponent";

const UserMenu = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const {user} = useAuth();
  const {mutate: logout} = useLogout();
  const {t} = useTranslation(["common", "menu"])
  const navigate = useNavigate();

  const onClickRoute = (path: string) => {
    navigate(path, {replace: true})
    setDropdownOpened(false);
  }

  const onClickLogout = (path: string) => {
    logout(path);
    setDropdownOpened(false);
  }
  const remappedRoutes = (structuredMenu[AUTH_DOMAINS.PRIVATE]?.user || []).map(({path, handle}) => ({
      onClick: handle.key === 'LOGOUT' ? () => onClickLogout(path) : () => onClickRoute(path),
      path,
      ...handle
    }))

  const userMenuOpen = clsx({[style['c-user-menu__chevron-opened']]: dropdownOpened});

  return (
    <Dropdown<DropdownProp>
      label={
        <div className={style["c-user-menu__user-info"]}>
          <span className={style["c-user-menu__username"]}>
            {user}
          </span>

          <ChevronDown
            className={userMenuOpen}
            size={12}
          />
        </div>
      } 
      options={remappedRoutes} 
      onTriggerClick={setDropdownOpened}
    >
      {({Icon, key, label, onClick, path}) => (
        <LinkComponent type="navLink" to={path} onClick={onClick} key={key} color="custom">
          <Icon size={14} /> {t(`menu:${label}`)}
        </LinkComponent>
      )}
    </Dropdown>
  )
}

export default UserMenu;
