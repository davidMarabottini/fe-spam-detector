import styles from './BadgeContainer.module.scss';

const BadgeContainer = ({badgeName}: {badgeName: string}) => {
  return (
     <div className={styles['c-badge-container']}>
        <div className={styles['c-badge-container__image']}></div>
        <p className={styles['c-badge-container__text']}>{badgeName}</p>
      </div>
  )
}

export default BadgeContainer;