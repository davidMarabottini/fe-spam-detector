import type { ReactNode } from "react";

export type DropDownItemBase = {
  key: string,
  label: string,
  onClick?: () => unknown,
}

export interface DropdownProps<T> {
  label: ReactNode;
  options: T[];
  className?: string;
  onTriggerClick?: (isOpen: boolean) => void;
  children: (ddo: T) => ReactNode;
}