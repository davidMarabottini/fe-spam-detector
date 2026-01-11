import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/api/authService';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useAppMutation } from '../useAppApi/useAppMutation';
import { useAppQuery } from '../useAppApi/useAppQuery';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    errorMap: {
      401: 'login.401',
      500: 'login.500',
      default: 'login.defaultError'
    }
  });
}

export const useMe = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authService.getMe,
    retry: false,
    staleTime: Infinity,
  });
};

export const useMineDetails = () =>
  useAppQuery({
    queryKey: ['mineDetails'],
    queryFn: authService.getMineDetails,
    errorMap: {
      401: `mineDetails.401`,
      500: `mineDetails.500`,
      default: 'mineDetails.defaultError',
    }
  })

export const useUpdateMineDetails = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: authService.updateMineDetails,
    onSuccess: updatedData => {
      queryClient.setQueryData(['mineDetails'], updatedData.user);
    },
    successKey: 'updateUser.success',
    errorMap: {
      401: 'updateUser.401',
      500: 'updateUser.500',
      default: 'updateUser.default'
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear(); 
      navigate(ROUTES.LOGIN, { replace: true });
    },
    successKey: 'logout.success',
    errorMap: {
      default: 'logout.error'
    }
  })
}
