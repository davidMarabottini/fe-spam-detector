import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { privateRoutes, publicRoutes } from '@constants/routes';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button/Button';


export const SideMenu = ({ isOpen, onClose, menuType }: { isOpen: boolean, onClose: () => void, menuType: 'publicRoutes' | 'privateRoutes' }) => {
  const {t} = useTranslation('menu');
  const navigate = useNavigate();

  const itemClickHandler = (route: string) => {
    navigate(route, {replace: true});
    onClose()
  }

  return (
    <>
    <nav className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: isOpen})}>
      <div className={styles['c-side-menu__header']}>
        <Typography variant="h3" color="primary">
          {t('title')}
        </Typography>
      </div>

      <ul className={styles['c-side-menu__list']}>
        {
          (menuType === 'privateRoutes' ? privateRoutes : publicRoutes).map(item => (
            <Button onClick={() => itemClickHandler(item.path)} asChild color="custom">
              <li key={item.key} className={styles['c-side-menu__item']}>
                <Typography 
                  as="a" 
                  onClick={() => itemClickHandler(item.path)}
                  additionalClasses={styles['c-side-menu__link']}
                >
                  {item.icon} {t(item.label)}
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
      aria-hidden="true" // TODO: capire
    />}
    </>
  );
};