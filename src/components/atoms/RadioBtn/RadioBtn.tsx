import { forwardRef, useId, useState } from "react";
import type { RadioGroupProps } from "./RadioBtn.types";
import styles from './RadioBtn.module.scss';
import clsx from "clsx";


const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, name, value, defaultValue, onChange, children, error, className, orientation, variant, gap, ...props }, ref) => {
    const [curValue, setCurValue] = useState<string | undefined>(defaultValue);

    const changeHandler = (cv: string) => {
      setCurValue(cv);
      onChange?.(cv);
    }

    const groupId = useId();

    return (
      <div className={clsx(styles['c-radio-btn'], className)} ref={ref} role="radiogroup" {...props}>
        <div className={clsx(styles['c-radio-btn__container'], {
          [styles['c-radio-btn__container--vertical']]: orientation === "vertical",
          [styles[`c-radio-btn__container--${gap}`]]: gap,
        })}>
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`;
            const isSelected = (value !== undefined ? value : curValue) === option.value;

            return (
              <div key={option.value} className={styles['c-radio-btn__item']}>
                <input

                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => changeHandler(option.value)}
                  className={clsx(styles['c-radio-btn__item-input'], {[styles['c-radio-btn__item-input--ghost']]: variant === 'ghost'})}
                />
                <label htmlFor={optionId} className={styles['c-radio--btn__item-label']}>
                  {typeof children === 'function' 
                    ? children(option, isSelected) 
                    : <span>{option.label}</span>
                  }
                </label>
              </div>
            );
          })}
        </div>
        {error && <span className={styles['c-radio-btn__error-msg']}>{error}</span>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
export default RadioGroup;
