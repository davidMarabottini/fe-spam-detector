import { predictSpam } from '@/api/spamService';
import type { AvailableDomainsType } from '@/types/contentsFormDatas.types';

import { useAppMutation } from '../useAppApi/useAppMutation';

export interface AnalyzeSpamParams {
  type: AvailableDomainsType;
  text: string;
}

export const useAnalyzeSpam = () => 
  useAppMutation(
    {
       mutationFn: ({ type, text }: AnalyzeSpamParams) => predictSpam(type, text),
       successKey: 'analyze.mail.success',
       errorMap: {
        401: 'analyze.mail.401',
        500: 'analyze.mail.500',
        'default': 'analyze.mail.default'
       }
    }
  )
