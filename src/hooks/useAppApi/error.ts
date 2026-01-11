import type { AxiosError } from "axios";

export type AppError = {
  kind: 'UNAUTHORIZED' | 'SERVER' | 'NETWORK' | 'UNKNOWN';
  status?: number;
  message: string;
}

export const normalizeError = (error: unknown): AppError => {
  if(!error) return {kind: 'UNKNOWN', message: 'Unknown error'};

  if((error as AxiosError).isAxiosError) {
    const e = error as AxiosError;
    const status = e.response?.status;

    if (status === 401) return { kind: 'UNAUTHORIZED', status, message: e.message };
    if (status === 500) return { kind: 'SERVER', status, message: e.message };
    if (!status) return { kind: 'NETWORK', message: e.message };

    return { kind: 'UNKNOWN', status, message: e.message };
  }
  return { kind: 'UNKNOWN', message: (error as Error)?.message || 'Unknown error' };
}