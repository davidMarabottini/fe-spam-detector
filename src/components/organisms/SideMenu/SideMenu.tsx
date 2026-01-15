import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { structuredMenu } from '@constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button/Button';
import { useAuth } from '@/auth/useAuth';
import { useMenuStore } from '@/zustand/menuState';

export const SideMenu = () => {
  const {t} = useTranslation('menu');
  const { menuOpen, setMenuOpen } = useMenuStore();
  const navigate = useNavigate();
  const {domain} = useAuth();
  console.log('side menu render');
  const itemClickHandler = (route: string) => {
    navigate(route, {replace: false});
    setMenuOpen(false);
  }
    
  const menuItems = (structuredMenu[domain]?.main || []).map(({ path, handle: { key, label, Icon } }) => ({
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
              <Button key={key} onClick={() => itemClickHandler(path)} asChild color="custom">
                <li className={styles['c-side-menu__item']}>
                  <Typography 
                    as="a" 
                    onClick={() => itemClickHandler(path)}
                    additionalClasses={styles['c-side-menu__link']}
                  >
                    <Icon size={16} /> {label}
                  </Typography>
              </li>
            </Button>
          ))}
        </ul>
      </nav>
      {menuOpen && <div 
        className={clsx(styles['c-side-menu__backdrop'], menuOpen && styles['c-side-menu__backdrop--visible'])} 
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        role="presentation"
      />}
    </>
  );
};