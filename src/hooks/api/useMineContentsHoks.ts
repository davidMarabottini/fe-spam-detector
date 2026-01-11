import * as mineContentService from '@/api/mineContentService';
import type { AvailableDomainsType } from '@/types/contentsFormDatas.types';
import { useAppMutation } from '../useAppApi/useAppMutation';

export const useInsertContent = (insertingType: AvailableDomainsType) =>
  useAppMutation({
    mutationFn: mineContentService.insertMineContent,
    successKey: `insert.${insertingType}.success`,
    errorMap: {
      401: `insert.${insertingType}.401`,
      500: `insert.${insertingType}.500`,
      default: 'insert.defaultError',
    },
  });

