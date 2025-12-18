import styles from './Button.module.scss';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ label, onClick, color="primary", type="button", disabled=false, rounded }) => {
  return (
    <button
      className={
        clsx(
          styles['c-button'],
          styles[`c-button--${color}`],
          {
            [styles['c-button--disabled']]: disabled,
            [styles['c-button--rounded']]: rounded
          })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
export default Button;