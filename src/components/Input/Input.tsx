import type { InputProps } from "./Input.types";
import styles from "./Input.module.scss";
import clsx from "clsx";
import { forwardRef, useEffect } from "react";
import { isNullable } from "@/utils/isNullable";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, onChange, onValueChange, className, value, ...props }, ref) => {


    useEffect(() => {console.log(isNullable(value))}, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={clsx(styles['c-input'], { 
        [styles['c-input--error']]: !!error,
        [styles['c-input--floating']]: !isNullable(label)
      })}>
        <div className={styles['c-input__wrapper']}>
          <input
            ref={ref}
            value={value}
            className={clsx(styles['c-input__field'], className)}
            onChange={handleChange}
            {...props}
          />
          {label && <label className={clsx(styles['c-input__label'], {[styles['c-input__label--floating']]: !isNullable(value)})}>{label}</label>}
        </div>
        {error && <span className={styles['c-input__error-msg']}>{error}</span>}
      </div>
    );
  }
);

export default Input;
