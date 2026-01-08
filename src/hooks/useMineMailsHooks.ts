import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as mineMailService from '@/api/mineMailService';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';
import type { AxiosError } from 'axios';

export const useInsertMail = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation("toastMessages")
  const {addToast} = useToast();

  return useMutation({
    mutationFn: mineMailService.insertMineMail,
    onSuccess: data => {
      queryClient.setQueryData(['insertedMail'], data)
      addToast(t('insertMail.success'), 'success');
    },
    onError: (e: AxiosError) => {
      switch(e.code) {
        case '401':
          addToast(t('insertMail.401'), 'failure')
          return;
        case '500':
          addToast(t('insertMail.500'), 'failure')
          return
        default:
          addToast(e, 'failure')
      }
    }
  })
}