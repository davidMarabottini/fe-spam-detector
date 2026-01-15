import clsx from "clsx";
import { structuredMenu } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/api/useAuthenticationHooks";
import { useMemo, useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { useTranslation } from "react-i18next";
import { ChevronDown, LogOut } from "lucide-react";
import type { DropdownProp } from "../Header/Header.types";
import Dropdown from "@/components/molecules/Dropdown/Dropdown";
import Button from "@/components/atoms/Button/Button";
import style from "./UserMenu.module.scss";
import { AUTH_DOMAINS } from "@/constants/configuration";

const UserMenu = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const {user} = useAuth();
  const {mutate: logout} = useLogout();
  const {t} = useTranslation(["common", "menu"])
  const navigate = useNavigate();
  console.log('user menu render');
  const remappedRoutes = useMemo(
    () => (structuredMenu[AUTH_DOMAINS.PRIVATE]?.user || []).map(({path, handle}) => ({
      onClick: () => {
        navigate(path, {replace: true})
        setDropdownOpened(false);
      },
      ...handle
    })), [navigate])

  const userMenuOpen = clsx({[style['c-user-menu__chevron-opened']]: dropdownOpened});

  const menuOptions = [
    ...remappedRoutes,
    {
      key:'logout',
      label: t('common:header.actions.logout'),
      Icon: LogOut,
      onClick: logout,
    },
  ] as DropdownProp[];

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
      options={menuOptions} 
      onTriggerClick={setDropdownOpened}
    >
      {({Icon, key, label}) => (
        <Button key={key} color="custom">
          <Icon size={14} /> {t(`menu:${label}`)}
        </Button>
      )}
    </Dropdown>
  )
}

export default UserMenu;
