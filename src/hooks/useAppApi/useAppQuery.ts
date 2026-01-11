import { useQuery } from '@tanstack/react-query';
import { normalizeError, type AppError } from './error';
import { handleToast, type ToastOptions } from './toastHandler';
import { useToast } from '../useToast';
import { useTranslation } from 'react-i18next';

type AppQueryOptions<TData> = ToastOptions & {
  queryKey: readonly unknown[];
  queryFn: () => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: AppError) => void;
};

export const useAppQuery = <TData>(options: AppQueryOptions<TData>) => {
  const { addToast } = useToast();
  const { t } = useTranslation('toastMessages');

  return useQuery<TData, AppError>({
    queryKey: options.queryKey,
    queryFn: async () => {
      try {
        const data = await options.queryFn();
        handleToast(null, options, addToast, t);
        options.onSuccess?.(data);
        return data;
      } catch (err) {
        const appError = normalizeError(err);
        handleToast(appError, options, addToast, t);
        options.onError?.(appError);
        throw appError;
      }
    },
  });
}
