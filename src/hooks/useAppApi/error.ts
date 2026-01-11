import type { AxiosError } from "axios";

export type AppError = {
  kind: 'UNAUTHORIZED' | 'SERVER' | 'NETWORK' | 'UNKNOWN';
  status?: number;
  message: string;
}

const kinds = {
  401: 'UNAUTHORIZED',
  500: 'SERVER',
  'default': 'UNKNOWN',
} as const;

type KindKey = keyof typeof kinds;

const isKindNr = (status: number): status is Extract<KindKey, number> => status in kinds;

export const normalizeError = (error: unknown): AppError => {
  if(!error) return {kind: 'UNKNOWN', message: 'Unknown error'};

  if((error as AxiosError).isAxiosError) {
    const {response, message} = error as AxiosError;
    const status = response?.status;
    
    if (!status) return { kind: 'NETWORK', message };

    const kind = isKindNr(status) ? kinds[status] : kinds.default;

    return { kind, status, message }
  }

  return { kind: kinds.default, message: (error as Error)?.message || 'Unknown error' };
}