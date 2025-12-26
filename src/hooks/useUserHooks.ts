import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as userService from '@/api/userService';

export const useInsertUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.insertUser,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data)
    }
  })
}