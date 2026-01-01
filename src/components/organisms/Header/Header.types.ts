import type { ReactNode } from "react";

export type DropdownProp = {
  key: string,
  label: string,
  onClick: () => void,
  icon: ReactNode
}

export interface HeaderProps {
  logout?: () => void;
  userDetails?: string;
};