import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { privateRoutes, publicRoutes, ROUTES } from '@/constants/routes';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';


export const SideMenu = ({ isOpen, onClose, menuType }: { isOpen: boolean, onClose: () => void, menuType: 'publicRoutes' | 'privateRoutes' }) => {
  const {t} = useTranslation('menu');
  const navItems = useMemo(() => (
    {
      privateRoutes: privateRoutes.map(x => ({label: t(ROUTES[x].string), href: ROUTES[x].path})),
      publicRoutes: publicRoutes.map(x => ({label: t(ROUTES[x].string), href: ROUTES[x].path}))
    }
  ), [t])
    

  return (
    <>
    <nav className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: isOpen})}>
      <div className={styles['c-side-menu__header']}>
        <Typography variant="h3" color="primary">
          {t('title')}
        </Typography>
      </div>

      <ul className={styles['c-side-menu__list']}>
        {navItems[menuType].map((item) => (
          <li key={item.href} className={styles['c-side-menu__item']}>
            <Typography 
              as="a" 
              href={item.href} 
              additionalClasses={styles['c-side-menu__link']}
            >
              {item.label}
            </Typography>
          </li>
        ))}
      </ul>
    </nav>
    {open && <div 
      className={clsx(styles['c-side-menu__backdrop'], isOpen && styles['c-side-menu__backdrop--visible'])} 
      onClick={onClose}
      aria-hidden="true" // TODO: capire
    />}
    </>
  );
};