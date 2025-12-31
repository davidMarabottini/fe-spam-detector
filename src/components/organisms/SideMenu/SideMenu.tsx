import clsx from 'clsx';
import Typography from '@components/atoms/Typography/Typography';
import styles from './SideMenu.module.scss';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profilo', href: '/profile' },
  { label: 'Impostazioni', href: '/settings' },
];

export const SideMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

  return (
    <>
    <nav className={clsx(styles['c-side-menu'], {[styles['c-side-menu--open']]: isOpen})}>
      <div className={styles['c-side-menu__header']}>
        <Typography variant="h3" color="primary">
          App Menu
        </Typography>
      </div>

      <ul className={styles['c-side-menu__list']}>
        {navItems.map((item) => (
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

      <div className={styles['c-side-menu__footer']}>
        <Typography variant="small" color="muted">
          Versione 1.0.0
        </Typography>
      </div>
    </nav>
          {open && <div 
        className={clsx(styles['c-side-menu__backdrop'], isOpen && styles['c-side-menu__backdrop--visible'])} 
        onClick={onClose}
        aria-hidden="true"
      />}
    </>
  );
};