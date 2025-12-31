import { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";
import type { DropdownProps } from "./Dropdown.types.ts";
import Button from "../../atoms/Button/Button.tsx";

const Dropdown = ({ label, options, className, onTriggerClick }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerClickHandler = (open: boolean) => {
    setIsOpen(open)
    onTriggerClick?.(open)
  }

  return (
    <div className={clsx(styles["c-dropdown"], { [styles["c-dropdown--open"]]: isOpen }, className)} ref={containerRef}>
      <Button
        additionalClassName={styles["c-dropdown__trigger"]}
        onClick={() => triggerClickHandler(!isOpen)}
        aria-expanded={isOpen}
        color="custom"
      >
        
        {label}
          
      </Button>

      {isOpen && (
        <div className={styles["c-dropdown__menu"]}>
          <ul className={styles["c-dropdown__list"]}>
            {options.map((option, index) => (
              <li key={index} className={styles["c-dropdown__item"]}>
                {option.url ? (
                  <a href={option.url} className={styles["c-dropdown__action"]}>
                    {option.label}
                  </a>
                ) : (
                  <Button
                    additionalClassName={styles["c-dropdown__action"]}
                    color="custom"
                    onClick={() => {
                      option.onClick?.();
                      setIsOpen(false);
                    }}
                  >{option.label}</Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;