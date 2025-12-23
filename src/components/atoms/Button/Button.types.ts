import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'custom';
  rounded?: boolean;
  additionalClassName?: string;
}
