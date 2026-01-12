import { predictSpam } from '@/api/spamService';
import type { AvailableDomainsType } from '@/types/contentsFormDatas.types';

import { useAppMutation } from '../useAppApi/useAppMutation';
import { ERROR_KINDS } from '../useAppApi/error';

export interface AnalyzeSpamParams {
  type: AvailableDomainsType;
  text: string;
}
const domain = 'analyze';
export const useAnalyzeSpam = () => 
  useAppMutation(
    {
       mutationFn: ({ type, text }: AnalyzeSpamParams) => predictSpam(type, text),
       successKey: 'analyze.mail.success',
       errorMap: {
        [ERROR_KINDS.UNAUTHORIZED]: `${domain}.mail.401`,
        [ERROR_KINDS.SERVER]: `${domain}.mail.500`,
        [ERROR_KINDS.NETWORK]: `${domain}.mail.network`,
        [ERROR_KINDS.UNKNOWN]: `${domain}.mail.defaultError`
       }
    }
  )
