import styles from './Button.module.scss';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';
import { forwardRef } from 'react';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    color = "primary", 
    type = "button", 
    disabled = false, 
    rounded,
    onClick,
    additionalClassName,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
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
        {...props}
      >
        {children}
      </button>
    );
});

Button.displayName = "Button";
export default Button;
