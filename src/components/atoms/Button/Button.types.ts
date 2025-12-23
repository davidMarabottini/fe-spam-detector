import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  color?: 'primary' | 'secondary' | 'custom';
  rounded?: boolean;
  disabled?: boolean;
  additionalClassName?: string;
}