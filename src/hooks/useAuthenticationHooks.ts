import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/api/authService';

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear(); 
      window.location.href = '/login';
    },
  });
};