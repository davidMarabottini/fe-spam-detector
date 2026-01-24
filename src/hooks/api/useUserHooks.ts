import { useQueryClient } from '@tanstack/react-query';
import * as userService from '@/api/userService';
import { useAppMutation } from '../useAppApi/useAppMutation';
import { ERROR_KINDS } from '../useAppApi/error';
import { useAppQuery } from '../useAppApi/useAppQuery';

const domain = 'me';

export const useInsertUser = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: userService.insertUser,
    onSuccess: data => {
      queryClient.setQueryData(['result'], data)
    },
    successKey: `${domain}.insert.success`,
    errorMap: {
      [ERROR_KINDS.UNAUTHORIZED]: `${domain}.insert.401`,
      [ERROR_KINDS.SERVER]: `${domain}.insert.500`,
      [ERROR_KINDS.NETWORK]: `${domain}.insert.network`,
      [ERROR_KINDS.UNKNOWN]: `${domain}.insert.defaultError`
    },
  })
}

export const useUserStatus = () =>
  useAppQuery<userService.UserStatusResult>({
    queryKey: ['userStatus'],
    queryFn: userService.getUserStatus,
    staleTime: 1000 * 60 * 5, 
  });
