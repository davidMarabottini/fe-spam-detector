import type { AvailableStatusesType } from "@/types/contentsFormDatas.types";
import type { AppError } from "./error";

export type ToastOptions = {
  successKey?: string;
  errorMap?: Record<number | 'default', string>;
};

export const handleToast = (
  error: AppError | null,
  options: ToastOptions,
  addToast: (msg: string, type: AvailableStatusesType) => void,
  t: (key: string) => string
) => {
  if (!error) {
    if (options.successKey) {
      addToast(t(options.successKey), 'success');
    }
    return;
  }

  const key = (error.status && options.errorMap?.[error.status]) ?? options.errorMap?.default;
  addToast(key ? t(key) : error.message, 'failure');
}