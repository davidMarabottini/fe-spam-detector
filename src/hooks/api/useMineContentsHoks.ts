import * as mineContentService from '@/api/mineContentService';
import type { AvailableDomainsType } from '@/types/contentsFormDatas.types';
import { useAppMutation } from '../useAppApi/useAppMutation';
import { ERROR_KINDS } from '../useAppApi/error';

const domain = 'content';
export const useInsertContent = (insertingType: AvailableDomainsType) =>
  useAppMutation({
    mutationFn: mineContentService.insertMineContent,
    successKey: `${domain}.insert.${insertingType}.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${domain}.insert.${insertingType}.401`,
      [ERROR_KINDS.SERVER]: `${domain}.insert.${insertingType}.500`,
      [ERROR_KINDS.NETWORK]: `${domain}.insert.${insertingType}.network`,
      [ERROR_KINDS.UNKNOWN]: `${domain}.insert.${insertingType}.defaultError`
    },
  });
//TODO: valutare la fusione tra questo file e useAnalyzeSpam.ts
