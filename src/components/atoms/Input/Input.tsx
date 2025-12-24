import type { InputProps } from "./Input.types";
import styles from "./Input.module.scss";
import clsx from "clsx";
import { forwardRef, useId } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, onChange, onValueChange, id, className, value, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={clsx(styles['c-input'], { 
        [styles['c-input--error']]: !!error,
      })}>
        <div className={styles['c-input__wrapper']}>
          <input
            ref={ref}
            id={inputId}
            value={value}
            className={clsx(styles['c-input__field'], className)}
            onChange={handleChange}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {label && <label htmlFor={inputId} className={clsx(styles['c-input__label'])}>{label}</label>}
        </div>
        {error && <span id={errorId} className={styles['c-input__error-msg']} aria-live="polite">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
