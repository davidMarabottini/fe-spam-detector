import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as mineContentService from '@/api/mineContentService';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';
import type { AxiosError } from 'axios';
import type { AvailableDomains } from '@/types/contentsFormDatas.types';

export const useInsertContent = (insertingType: AvailableDomains) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation("toastMessages")
  const {addToast} = useToast();

  return useMutation({
    mutationFn: mineContentService.insertMineContent,
    onSuccess: data => {
      queryClient.setQueryData(['insertedContent'], data)
      addToast(t(`insert.${insertingType}.success`), 'success');
    },
    onError: (e: AxiosError) => {
      switch(e.code) {
        case '401':
          addToast(t(`insert.${insertingType}.401`), 'failure')
          return;
        case '500':
          addToast(t(`inser.${insertingType}l.500`), 'failure')
          return
        default:
          addToast(e.message, 'failure')
      }
    }
  })
}