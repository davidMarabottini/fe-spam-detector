import styles from './Button.module.scss';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ children, onClick, color="primary", type="button", disabled=false, rounded, additionalClassName }) => {
  return (
    <button
      className={
        clsx(
          styles['c-button'],
          styles[`c-button--${color}`],
          additionalClassName,
          {
            [styles['c-button--disabled']]: disabled,
            [styles['c-button--rounded']]: rounded,
          })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Button;