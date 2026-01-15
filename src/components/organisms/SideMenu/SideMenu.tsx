import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { structuredMenu } from '@constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { useMenuStore } from '@/zustand/menuState';
import LinkComponent from '@/components/atoms/LinkComponent/LinkComponent';

export const SideMenu = () => {
  const {t} = useTranslation('menu');
  const { menuOpen, closeMenu } = useMenuStore();
  const navigate = useNavigate();
  const {domain} = useAuth();
  
  const itemClickHandler = (route: string) => {
    navigate(route, {replace: false});
    closeMenu();
  }
  const menuItems = (
    structuredMenu[domain]?.main || []).map(({ path, handle: { key, label, Icon } }) => ({
    key,
    label: t(label),
    Icon,
    path,
  }));

  return (
    <>
      <nav id="side-menu" className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: menuOpen})}>
        <div className={styles['c-side-menu__header']}>
          <Typography variant="h3" color="primary">
            {t('title')}
          </Typography>
        </div>
        <ul className={styles['c-side-menu__list']}>
          {menuItems.map(({path, key, label, Icon}) => (
            <li key={key} className={styles['c-side-menu__item']} onClick={() => itemClickHandler(path)}>
              <LinkComponent
                className={styles['c-side-menu__link']}
                onClick={() => itemClickHandler(path)}
                to={path}
              >
                <Icon size={16} /> {label}
              </LinkComponent>
            </li>
          ))}
        </ul>
      </nav>
      {menuOpen && (
        <div 
          className={clsx(styles['c-side-menu__backdrop'], menuOpen && styles['c-side-menu__backdrop--visible'])} 
          onClick={closeMenu}
          aria-hidden="true"
          role="presentation"
        />)}
    </>
  );
};