import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as mineMailService from '@/api/mineMailService';

export const useInsertMail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mineMailService.insertMineMail,
    onSuccess: data => {
      queryClient.setQueryData(['insertedMail'], data)
    }
  })
}