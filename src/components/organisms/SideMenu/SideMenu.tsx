import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';
import { privateMenu, publicOnlyMenu } from '@constants/routes';
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
    <nav id="side-menu" className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: isOpen})}>
      <div className={styles['c-side-menu__header']}>
        <Typography variant="h3" color="primary">
          {t('title')}
        </Typography>
      </div>

      <ul className={styles['c-side-menu__list']}>
        {
          (menuType === 'privateRoutes' ? privateMenu : publicOnlyMenu).map(({path, handle: {key, label, Icon}}) => (
            <Button key={key} onClick={() => itemClickHandler(path)} asChild color="custom">
              <li className={styles['c-side-menu__item']}>
                <Typography 
                  as="a" 
                  onClick={() => itemClickHandler(path)}
                  additionalClasses={styles['c-side-menu__link']}
                >
                  <Icon size={16} /> {t(label)}
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