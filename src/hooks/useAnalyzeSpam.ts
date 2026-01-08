import { useMutation } from '@tanstack/react-query';
import { predictSpam, type AnalyzeSpamResult } from '@/api/spamService';
import type { AvailableDomains } from '@/types/contentsFormDatas.types';

export interface AnalyzeSpamParams {
  type: AvailableDomains;
  text: string;
}

export const useAnalyzeSpam = () =>
useMutation<AnalyzeSpamResult, Error, AnalyzeSpamParams>({
  mutationFn: ({ type, text }: AnalyzeSpamParams) =>
    predictSpam(type, text),
});