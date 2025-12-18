import { useMutation } from '@tanstack/react-query';
import { predictSpam, type AnalyzeSpamResult } from '../api/spamService';

export interface AnalyzeSpamParams {
  type: 'sms' | 'mail';
  text: string;
}

export const useAnalyzeSpam = () =>
useMutation<AnalyzeSpamResult, Error, AnalyzeSpamParams>({
  mutationFn: ({ type, text }: AnalyzeSpamParams) =>
    predictSpam(type, text),
});