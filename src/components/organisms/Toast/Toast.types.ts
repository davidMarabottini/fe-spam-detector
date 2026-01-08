import type { ReactNode } from "react";

export interface IToastContext {
  addToast: (msg: string, type: 'success' | 'failure') => void;
  toasts: IToastItem[];
}

export interface IToastProviderProps {
  children: ReactNode;
}

export interface IToastItem {
  id: number;
  msg: string;
  type: 'success' | 'failure';
}