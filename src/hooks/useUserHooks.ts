import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
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

export const useUserStatus = () =>
  useQuery<userService.UserStatusResult, Error>({
    queryKey: ['userStatus'],
    queryFn: userService.getUserStatus,
    staleTime: 1000 * 60 * 5, 
  });
