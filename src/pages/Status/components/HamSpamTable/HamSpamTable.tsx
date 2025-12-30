import type { ReactNode } from 'react';
import styles from './HamSpamTable.module.scss';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

interface HamSpamTableProps {
  children: ReactNode;
  ham: number;
  spam: number;
}

const HamSpamTable = ({children, ham, spam}: HamSpamTableProps) => {
  return (
     <div className={styles['c-ham-spam-table']}>
        {children}
        <div className={styles['c-ham-spam-table__row']}>
          <div className={clsx(styles['c-ham-spam-table__cell'], styles['c-ham-spam-table__cell--ham'])}><ShieldCheck size={16} />{ham} Ham</div>
          <div className={clsx(styles['c-ham-spam-table__cell'], styles['c-ham-spam-table__cell--spam'])}><ShieldAlert size={16}/>{spam} Spam</div>
        </div>
    </div>
  )
}

export default HamSpamTable;