import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { useTranslation } from 'react-i18next';
import { useMenuStore } from '@/zustand/menuState';
import MenuManager from '@/components/molecules/MenuManager/MenuManager';
import { useEffect } from 'react';

export const SideMenu = () => {
  const {t} = useTranslation('common');
  const { menuOpen, closeMenu } = useMenuStore();

  useEffect(() => {
    if (!menuOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen, closeMenu]);
  
  const sideMenuClass = clsx(
    styles['c-side-menu'],
    {
      [styles['c-side-menu--open']]: menuOpen
    }
  )

  return (
    <>
      <nav
        id="side-menu"
        className={sideMenuClass}
      >
        <div className={styles['c-side-menu__header']}>
          <Typography variant="h3" color="primary">
            {t('sideMenu.title')}
          </Typography>
        </div>

        <MenuManager
          curMenu='main'
          additionalClass={styles['c-side-menu__list']}
          itemClickHandler={closeMenu}
        />
      </nav>
      
      {menuOpen && (
        <div 
          className={clsx(styles['c-side-menu__backdrop'], menuOpen && styles['c-side-menu__backdrop--visible'])} 
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          onClick={closeMenu}
          onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
        />)}
    </>
  );
};
