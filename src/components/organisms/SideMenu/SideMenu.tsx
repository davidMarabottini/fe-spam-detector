import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { privateMenu, publicOnlyMenu } from '@constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button/Button';
import { useAuth } from '@/auth/useAuth';
import { useMemo } from 'react';


export const SideMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const {t} = useTranslation('menu');
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  const itemClickHandler = (route: string) => {
    navigate(route, {replace: true});
    onClose()
  }

  const menuItems = useMemo(() => {
    const menu = isAuthenticated ? privateMenu : publicOnlyMenu;
    
    return menu.map(({ path, handle: { key, label, Icon } }) => ({
      key,
      label: t(label),
      Icon,
      path,
    }));
  }, [isAuthenticated, t]);

  return (
    <>
    <nav id="side-menu" className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: isOpen})}>
      <div className={styles['c-side-menu__header']}>
        <Typography variant="h3" color="primary">
          {t('title')}
        </Typography>
      </div>

      <ul className={styles['c-side-menu__list']}>
        {
          menuItems.map(({path, key, label, Icon}) => (
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
          ))
        }
      </ul>
    </nav>
    {isOpen && <div 
      className={clsx(styles['c-side-menu__backdrop'], isOpen && styles['c-side-menu__backdrop--visible'])} 
      onClick={onClose}
      aria-hidden="true"
      role="presentation"
    />}
    </>
  );
};