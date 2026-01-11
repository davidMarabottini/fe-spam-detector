import { useQueryClient, useQuery } from '@tanstack/react-query';
import * as userService from '@/api/userService';
import { useAppMutation } from '../useAppApi/useAppMutation';

export const useInsertUser = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: userService.insertUser,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data)
    },
    successKey: 'insertUser.success',
    errorMap: {
      401: `insertUser.401`,
      500: `insertUser.500`,
      default: 'insertUser.defaultError',
    }
  })
}

export const useUserStatus = () =>
  useQuery<userService.UserStatusResult, Error>({
    queryKey: ['userStatus'],
    queryFn: userService.getUserStatus,
    staleTime: 1000 * 60 * 5, 
  });
