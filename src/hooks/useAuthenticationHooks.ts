import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/api/authService';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

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

export const useMineDetails = () => {
  return useQuery({
    queryKey: ['mineDetails'],
    queryFn: () => authService.getMineDetails(),

  });
};


export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear(); 
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};